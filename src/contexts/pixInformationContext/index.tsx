import { useCurrentUser } from "contexts/currentUserContext";

import {
  createContext,
  useContext,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import pixPaymentApi from "services/api/pixPaymentApi";
import PaymentIntent from "types/entities/PaymentIntent";
import { ConfirmPaymentResult, useStripe } from "@stripe/stripe-react-native";
import { normalizedLanguage } from "lib/currentLanguage";
import {
  EXPO_PUBLIC_STRIPE_API_KEY,
  PLATFORM,
} from "utils/constants/Application";
import { showToast } from "lib/Toast";
import { useNavigation } from "hooks/useNavigation";
import { useIntegrationContext } from "contexts/integrationContext";
import axios from "axios";
import { Cause, NonProfit, Offer } from "@ribon.io/shared";
import { countryByLanguage } from "lib/countryByLanguage";
import { useLanguage } from "contexts/languageContext";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";

export interface IPixPaymentInformationContext {
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  buttonDisabled: boolean;
  handleSubmit: () => void;
  clientSecret?: string;
  pixInstructions?: PaymentIntent & ConfirmPaymentResult;
  verifyPayment: (clientSecret?: string, interval?: string) => void;
  setCountry: (value: SetStateAction<string>) => void;
  setTaxId: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string | undefined>) => void;
  setName: (value: SetStateAction<string>) => void;
  setOffer: (value: SetStateAction<Offer | undefined>) => void;
  setFlow: (value: SetStateAction<"cause" | "nonProfit">) => void;
  country: string;
  taxId: string;
  email: string | undefined;
  name: string;
  offer: Offer | undefined;
  flow: "cause" | "nonProfit";
  cause: Cause | undefined;
  setCause: (value: SetStateAction<Cause | undefined>) => void;
  nonProfit: NonProfit | undefined;
  setNonProfit: (value: SetStateAction<NonProfit | undefined>) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PixPaymentInformationContext =
  createContext<IPixPaymentInformationContext>(
    {} as IPixPaymentInformationContext,
  );

function PixPaymentInformationProvider({ children }: Props) {
  const { currentLang } = useLanguage();
  const currentContry = countryByLanguage(currentLang);
  const { currentUser } = useCurrentUser();

  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const [clientSecret, setClientSecret] = useState();
  const [country, setCountry] = useState<string>(currentContry);
  const [taxId, setTaxId] = useState<string>("");
  const [email, setEmail] = useState<string | undefined>(
    currentUser?.email ?? undefined,
  );
  const [name, setName] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [offer, setOffer] = useState<Offer | undefined>();
  const [cause, setCause] = useState<Cause | undefined>();
  const [nonProfit, setNonProfit] = useState<NonProfit | undefined>();
  const [flow, setFlow] = useState<"cause" | "nonProfit">("nonProfit");

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.pixPaymentInformation",
  });

  const { confirmPayment } = useStripe();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { currentIntegrationId } = useIntegrationContext();
  const { integration } = useIntegration(currentIntegrationId);
  const { createSource } = useSources();
  const [pixInstructions, setPixInstructions] = useState<
    PaymentIntent & ConfirmPaymentResult
  >();

  const { navigateTo } = useNavigation();

  const headers = {
    Authorization: `Bearer ${EXPO_PUBLIC_STRIPE_API_KEY}}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

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
  const generatePixPayment = async (clientS: string) => {
    try {
      const response = await axios.post(
        `https://api.stripe.com/v1/payment_intents/${clientS}/confirm`,
        {},
        { headers },
      );

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

      showToast({
        message: t("onErrorMessage"),
        type: "info",
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  const verifyPixPayment = async (secret?: string, interval?: string) => {
    try {
      const { paymentIntent } = await confirmPayment(secret ?? "");

      if (paymentIntent?.status === "Succeeded") {
        clearInterval(interval);
        login();
        navigateTo("DonationDoneScreen", {
          hasButton: true,
          offerId: offer?.id ?? 0,
          cause,
          nonProfit,
          flow,
        });
      }
    } catch (e) {
      logError(e);
      showToast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };

  const handleSubmit = async () => {
    const paymentInformation = {
      email: email ?? "",
      country,
      taxId: taxId ?? "",
      offerId: offer?.id ?? 0,
      name: name ?? "",
      integrationId: currentIntegrationId ?? 1,
      causeId: cause?.id,
      nonProfitId: nonProfit?.id,
      platform: PLATFORM,
      city: "",
      state: "",
    };

    try {
      const response = await pixPaymentApi.postPixPayment(paymentInformation);

      setClientSecret(response.data.externalId);
      generatePixPayment(response.data.externalId);
      showLoadingOverlay();
    } catch (error) {
      hideLoadingOverlay();
      logError(error);
      showToast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };

  const pixPaymentInformationObject: IPixPaymentInformationContext = useMemo(
    () => ({
      country,
      taxId,
      email,
      name,
      offer,
      flow,
      cause,
      nonProfit,
      setCause,
      setNonProfit,
      setButtonDisabled,
      setCountry,
      setTaxId,
      setEmail,
      setName,
      setOffer,
      setFlow,
      handleSubmit,
      buttonDisabled,
      pixInstructions,
      verifyPayment: verifyPixPayment,
    }),
    [buttonDisabled, clientSecret],
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
