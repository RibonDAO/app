import { useCurrentUser } from "contexts/currentUserContext";
import { createContext, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { creditCardPaymentApi } from "@ribon.io/shared/services";
import { showToast } from "lib/Toast";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { useNavigation } from "hooks/useNavigation";
import { PLATFORM } from "utils/constants/Application";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { logEvent } from "services/analytics";
import { useTasksContext } from "contexts/tasksContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useUtmContext } from "contexts/utmContext";
import { useCheckoutContext } from "contexts/checkoutContext";

export interface ICardPaymentInformationContext {
  handleSubmit: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CardPaymentInformationContext =
  createContext<ICardPaymentInformationContext>(
    {} as ICardPaymentInformationContext,
  );

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";

function CardPaymentInformationProvider({ children }: Props) {
  const { registerAction } = useTasksContext();

  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { currentIntegrationId } = useIntegrationContext();
  const { integration } = useIntegration(currentIntegrationId);
  const { createSource } = useSources();

  const {
    email,
    cvv,
    name,
    number,
    taxId,
    setButtonDisabled,
    expirationDate,
    state,
    country,
    city,
    cause,
    nonProfit,
    flow,
    offer,
    resetStates,
  } = useCheckoutContext();

  const login = async () => {
    if (!signedIn) {
      const user = await findOrCreateUser(
        email ?? "",
        await normalizedLanguage(),
      );
      if (integration) {
        createSource(user.id, integration.id);
      }
      setCurrentUser(user);
    }
  };

  const { utmSource, utmMedium, utmCampaign } = useUtmContext();

  const handleSubmit = async () => {
    showLoadingOverlay();

    const expiration = expirationDate.split("/");

    const paymentInformation = {
      email: email ?? "",
      country,
      state,
      city,
      taxId,
      offerId: offer?.id ?? 1,
      integrationId: currentIntegrationId ?? 1,
      card: {
        number: number.replace(/\D/g, "").slice(0, 16),
        name,
        expirationMonth: expiration[0],
        expirationYear: expiration[1].slice(-2),
        cvv,
      },
      causeId: cause?.id,
      nonProfitId: nonProfit?.id,
      platform: PLATFORM,
      utmSource,
      utmMedium,
      utmCampaign,
    };

    try {
      await creditCardPaymentApi.postCreditCardPayment(paymentInformation);
      login();
      if (flow === "nonProfit") {
        logEvent("ngoGave_end", {
          causeId: cause?.id,
          offerId: offer?.id,
        });
      } else {
        logEvent("causeGave_end", {
          causeId: cause?.id,
          offerId: offer?.id,
        });
      }
      registerAction("contribution_done_screen_view");

      navigateTo("ContributionDoneScreen", {
        cause,
        nonProfit,
        offer,
      });
      resetStates();
    } catch (error: any) {
      logError(error);
      showToast({
        type: "error",
        message: t("onErrorMessage", "error"),
      });
    } finally {
      setButtonDisabled(false);
      hideLoadingOverlay();
    }
  };

  const cardPaymentInformationObject: ICardPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
    }),
    [handleSubmit],
  );

  return (
    <CardPaymentInformationContext.Provider
      value={cardPaymentInformationObject}
    >
      {children}
    </CardPaymentInformationContext.Provider>
  );
}

export default CardPaymentInformationProvider;

export const useCardPaymentInformation = () => {
  const context = useContext(CardPaymentInformationContext);

  if (!context) {
    throw new Error(
      "useCardPaymentInformation must be used within CardPaymentInformationProvider",
    );
  }

  return context;
};
