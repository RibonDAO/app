import { useCurrentUser } from "contexts/currentUserContext";

import { createContext, useContext, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import pixPaymentApi from "services/api/pixPaymentApi";
import PaymentIntent from "types/entities/PaymentIntent";
import { ConfirmPaymentResult } from "@stripe/stripe-react-native";
import { normalizedLanguage } from "lib/currentLanguage";
import { PLATFORM } from "utils/constants/Application";
import { showToast } from "lib/Toast";
import { useNavigation } from "hooks/useNavigation";
import { useIntegrationContext } from "contexts/integrationContext";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { useCheckoutContext } from "contexts/checkoutContext";

export interface IPixPaymentInformationContext {
  buttonDisabled: boolean;
  handleSubmit: () => void;
  clientSecret?: string;
  pixInstructions?: PaymentIntent & ConfirmPaymentResult;
  verifyPayment: (id: string) => void;
  handleBackButtonClick: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PixPaymentInformationContext =
  createContext<IPixPaymentInformationContext>(
    {} as IPixPaymentInformationContext,
  );

function PixPaymentInformationProvider({ children }: Props) {
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.pixPaymentInformation",
  });

  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { currentIntegrationId } = useIntegrationContext();
  const { integration } = useIntegration(currentIntegrationId);
  const { createSource } = useSources();
  const [pixInstructions, setPixInstructions] = useState<
    PaymentIntent & ConfirmPaymentResult
  >();

  const { navigateTo } = useNavigation();

  const [clientSecret, setClientSecret] = useState();
  const {
    email,
    name,
    buttonDisabled,
    setButtonDisabled,
    cause,
    nonProfit,
    offer,
    taxId,
    flow,
    country,
  } = useCheckoutContext();

  const login = async () => {
    if (!signedIn) {
      try {
        const user = await findOrCreateUser(
          email ?? "",
          await normalizedLanguage(),
        );
        if (integration) {
          createSource(user.id, integration.id);
        }
        setCurrentUser(user);
      } catch (e) {
        logError(e);
      }
    }
  };

  const generatePixPayment = async (secret: string) => {
    try {
      const response = await pixPaymentApi.generatePix(secret);
      setPixInstructions(response.data);
      setTimeout(() => {
        hideLoadingOverlay();
      }, 500);
      navigateTo("PixInstructionsScreen", {
        offerId: offer?.id ?? 0,
        cause,
        nonProfit,
        flow,
      });
    } catch (e) {
      logError(e);

      hideLoadingOverlay();

      showToast({
        message: t("onErrorMessage"),
        type: "info",
      });
    } finally {
      setButtonDisabled(false);
      hideLoadingOverlay();
    }
  };

  const verifyPixPayment = async (id: string) => {
    try {
      const response = await pixPaymentApi.verifyPix(id ?? "");

      if (response?.data.status === "succeeded") {
        setPixInstructions(undefined);
        setClientSecret(undefined);

        navigateTo("ContributionDoneScreen", {
          hasButton: true,
          offerId: offer?.id ?? 0,
          cause,
          nonProfit,
          flow,
        });
      }
    } catch (e) {
      logError(e);
    } finally {
      hideLoadingOverlay();
    }
  };

  const handleSubmit = async () => {
    try {
      const paymentInformation = {
        email: email ?? "",
        country,
        taxId,
        offerId: offer?.id ?? 0,
        name,
        integrationId: currentIntegrationId ?? 1,
        causeId: cause?.id,
        nonProfitId: nonProfit?.id,
        platform: PLATFORM,
        city: "",
        state: "",
      };

      const response = await pixPaymentApi.postPixPayment(paymentInformation);

      setClientSecret(response.data.externalId);
      login();
      showLoadingOverlay();
      generatePixPayment(response.data.externalId);
    } catch (error) {
      hideLoadingOverlay();
      logError(error);

      showToast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };

  const handleBackButtonClick = () => {
    navigateTo("PromotersScreen");
    setClientSecret(undefined);
    setPixInstructions(undefined);
  };

  const pixPaymentInformationObject: IPixPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
      buttonDisabled,
      pixInstructions,
      verifyPayment: verifyPixPayment,
      handleBackButtonClick,
    }),
    [buttonDisabled, clientSecret, handleSubmit, pixInstructions],
  );

  return (
    <PixPaymentInformationContext.Provider value={pixPaymentInformationObject}>
      {children}
    </PixPaymentInformationContext.Provider>
  );
}

export default PixPaymentInformationProvider;

export const usePixPaymentInformation = () => {
  const context = useContext(PixPaymentInformationContext);

  if (!context) {
    throw new Error(
      "usePixPaymentInformation must be used within PixPaymentInformationProvider",
    );
  }

  return context;
};
