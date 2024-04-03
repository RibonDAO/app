import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
import { useTasksContext } from "contexts/tasksContext";
import { useNavigation } from "hooks/useNavigation";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { logError } from "services/crashReport";
import storePayApi from "services/api/storePayApi";
import InputText from "components/atomics/inputs/InputText";
import { useTranslation } from "react-i18next";
import { useIntegrationContext } from "contexts/integrationContext";
import { logEvent } from "services/analytics";
import { showToast } from "lib/Toast";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { normalizedLanguage } from "lib/currentLanguage";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { PLATFORM } from "utils/constants/Application";
import {
  PlatformPay,
  PlatformPayButton,
  usePlatformPay,
} from "@stripe/stripe-react-native";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "types/enums/Languages";
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
  isSubscription?: boolean;
};
export default function GooglePaySection({
  offer,
  cause,
  nonProfit,
  isSubscription,
}: Props) {
  const { registerAction } = useTasksContext();
  const { currentIntegrationId } = useIntegrationContext();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const [taxId, setTaxId] = useState("");
  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen.paymentMethodSection.creditCardFields",
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { createSource } = useSources();
  const { currentUser } = useCurrentUser();
  const { integration } = useIntegration(currentIntegrationId);
  const [email, setEmail] = useState(currentUser?.email ?? undefined);
  const [disabled, setDisabled] = useState(false);
  const { createPlatformPayPaymentMethod } = usePlatformPay();

  const testEnv = false;

  const { currentLang } = useLanguage();

  useEffect(() => {
    logEvent("selectGooglePay_click", {
      value: formatPrice(offer.priceValue, offer.currency),
      // eslint-disable-next-line no-nested-ternary
      target: nonProfit?.id ? "nonProfit" : cause?.id ? "cause" : "club",
    });
  }, []);

  const showFiscalFields = () => offer.gateway === "stripe";

  useEffect(() => {
    if (currentUser) setEmail(currentUser.email);
  }, [JSON.stringify(currentUser)]);

  const login = async () => {
    if (!signedIn) {
      const user = await findOrCreateUser(
        email ?? "",
        await normalizedLanguage(),
      );
      if (integration) {
        createSource(user.id, integration.id ?? "");
      }
      setCurrentUser(user);
    }
  };

  const createPaymentMethod = async () => {
    showLoadingOverlay();
    setDisabled(true);
    logEvent("confirmPaymentFormBtn_click", {
      source: "googlePay",
      // eslint-disable-next-line no-nested-ternary
      target: nonProfit?.id ? "nonProfit" : cause?.id ? "cause" : "club",
    });
    const { error, paymentMethod } = await createPlatformPayPaymentMethod({
      googlePay: {
        amount: offer.priceCents,
        currencyCode: offer.currency,
        testEnv,
        merchantName: "Ribon Foundation Inc",
        merchantCountryCode: isSubscription ? "US" : "BR",
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: false,
          isRequired: true,
        },
        existingPaymentMethodRequired: false,
        isEmailRequired: true,
        label: "Ribon Foundation Inc",
      },
    });
    setDisabled(false);
    if (error) {
      logError(error);
      hideLoadingOverlay();
    } else if (paymentMethod) {
      const { email: GPayEmail, name, address } = paymentMethod.billingDetails;

      login();

      const data = {
        offerId: offer.id,
        paymentMethodId: paymentMethod.id,
        email: email ?? GPayEmail,
        name,
        taxId,
        country: address?.country,
        city: address?.city,
        state: address?.state,
        integrationId: currentIntegrationId,
        causeId: cause?.id,
        nonProfitId: nonProfit?.id,
        paymentMethodType: "google_pay",
        platform: PLATFORM,
      };

      try {
        await storePayApi.postStorePay(data);

        registerAction("contribution_done_screen_view");

        if (nonProfit?.id) {
          logEvent("ngoGave_end", {
            nonProfitId: nonProfit?.id,
            offerId: offer?.id,
            source: "googlePay",
          });
          navigateTo("ContributionDoneScreen", {
            cause,
            nonProfit,
            offer,
          });
        } else if (cause?.id) {
          logEvent("causeGave_end", {
            causeId: cause?.id,
            offerId: offer?.id,
            source: "googlePay",
          });
          navigateTo("ContributionDoneScreen", {
            cause,
            nonProfit,
            offer,
          });
        } else {
          logEvent("clubGave_end", {
            offerId: offer?.id,
            source: "googlePay",
          });
          navigateTo("ClubContributionDoneScreen");
        }
      } catch (e) {
        logError(e);
        showToast({
          type: "error",
          message: t("onErrorMessage", "error"),
        });
      } finally {
        hideLoadingOverlay();
      }
    }
  };

  const googlePayButtonDisabled = () =>
    (showFiscalFields() && taxId.length < 14) || disabled;

  return (
    <View>
      <View>
        {showFiscalFields() && (
          <InputText
            name="taxId"
            label={currentLang === Languages.PT ? field("cpf") : field("taxId")}
            mask="999.999.999-99"
            value={taxId}
            onChangeText={(value) => setTaxId(value)}
            maxLength={14}
            keyboardType="numeric"
            style={{ display: "flex", flex: 1 }}
          />
        )}

        <PlatformPayButton
          type={PlatformPay.ButtonType.Pay}
          onPress={createPaymentMethod}
          style={S.payButton}
          disabled={googlePayButtonDisabled()}
        />
      </View>
    </View>
  );
}
