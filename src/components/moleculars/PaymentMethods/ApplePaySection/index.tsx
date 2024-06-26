import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  createPlatformPayPaymentMethod,
  PlatformPay,
  PlatformPayButton,
} from "@stripe/stripe-react-native";
import { Cause, Languages, NonProfit, Offer } from "@ribon.io/shared/types";
import storePayApi from "services/api/storePayApi";
import { logError } from "services/crashReport";
import { useTasksContext } from "contexts/tasksContext";
import { useNavigation } from "hooks/useNavigation";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { showToast } from "lib/Toast";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import { normalizedLanguage } from "lib/currentLanguage";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { PLATFORM } from "utils/constants/Application";
import InputText from "components/atomics/inputs/InputText";
import { useLanguage } from "contexts/languageContext";
import { logEvent } from "services/analytics";
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
  isSubscription?: boolean;
};

export default function ApplePaySection({
  offer,
  cause,
  nonProfit,
  isSubscription,
}: Props) {
  const [cart, setCart] = useState<any>([
    {
      label: "Ribon Foundation Inc",
      amount: offer.priceValue.toString(),
      intervalUnit: isSubscription ? PlatformPay.IntervalUnit.Month : null,
      intervalCount: isSubscription ? 1 : null,
      paymentType: isSubscription
        ? PlatformPay.PaymentType.Recurring
        : PlatformPay.PaymentType.Immediate,
    },
  ]);
  const [taxId, setTaxId] = useState("");
  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen.paymentMethodSection.creditCardFields",
  });

  const showFiscalFields = () => offer.gateway === "stripe";

  useEffect(() => {
    setCart([
      {
        label: "Ribon Foundation Inc",
        amount: offer.priceValue.toString(),
        intervalUnit: isSubscription ? PlatformPay.IntervalUnit.Month : null,
        intervalCount: isSubscription ? 1 : null,
        paymentType: isSubscription
          ? PlatformPay.PaymentType.Recurring
          : PlatformPay.PaymentType.Immediate,
      },
    ]);
  }, [offer]);

  const { registerAction } = useTasksContext();
  const { currentIntegrationId } = useIntegrationContext();

  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { createSource } = useSources();
  const { currentUser } = useCurrentUser();
  const { integration } = useIntegration(currentIntegrationId);
  const { currentLang } = useLanguage();
  const [email, setEmail] = useState(currentUser?.email ?? undefined);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (currentUser) setEmail(currentUser.email);
  }, [JSON.stringify(currentUser)]);

  useEffect(() => {
    logEvent("selectApplePay_click", {
      value: formatPrice(offer.priceValue, offer.currency),
      // eslint-disable-next-line no-nested-ternary
      target: nonProfit?.id ? "nonProfit" : cause?.id ? "cause" : "club",
    });
  }, []);

  const login = async () => {
    if (!signedIn) {
      const user = await findOrCreateUser(
        email ?? "",
        await normalizedLanguage(),
      );
      if (integration && integration.id) {
        createSource(user.id, integration.id);
      }
      setCurrentUser(user);
    }
  };

  const pay = async () => {
    showLoadingOverlay();
    setDisabled(true);
    logEvent("confirmPaymentFormBtn_click", {
      source: "applePay",
      // eslint-disable-next-line no-nested-ternary
      target: nonProfit?.id ? "nonProfit" : cause?.id ? "cause" : "club",
    });
    const { error, paymentMethod } = await createPlatformPayPaymentMethod({
      applePay: {
        cartItems: cart,
        merchantCountryCode: isSubscription ? "US" : "BR",
        currencyCode: offer.currency,
        requiredShippingAddressFields: [PlatformPay.ContactField.EmailAddress],
        requiredBillingContactFields: [
          PlatformPay.ContactField.Name,
          PlatformPay.ContactField.EmailAddress,
          PlatformPay.ContactField.PostalAddress,
        ],
      },
    });
    setDisabled(false);
    if (error) {
      hideLoadingOverlay();
    } else if (paymentMethod) {
      const { email: APayEmail, name, address } = paymentMethod.billingDetails;
      login();
      const data = {
        offerId: offer.id,
        paymentMethodId: paymentMethod.id,
        email: email ?? APayEmail,
        name,
        country: address?.country,
        city: address?.city,
        state: address?.state,
        integrationId: currentIntegrationId,
        causeId: cause?.id,
        nonProfitId: nonProfit?.id,
        paymentMethodType: "apple_pay",
        platform: PLATFORM,
        taxId,
      };
      try {
        await storePayApi.postStorePay(data);

        registerAction("contribution_done_screen_view");
        if (nonProfit?.id) {
          logEvent("ngoGave_end", {
            nonProfitId: nonProfit?.id,
            offerId: offer?.id,
            source: "applePay",
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
            source: "applePay",
          });
          navigateTo("ContributionDoneScreen", {
            cause,
            nonProfit,
            offer,
          });
        } else {
          logEvent("clubGave_end", {
            offerId: offer?.id,
            source: "applePay",
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

  const applePayButtonDisabled = () =>
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
          onPress={pay}
          type={PlatformPay.ButtonType.Pay}
          borderRadius={4}
          appearance={PlatformPay.ButtonStyle.Black}
          style={S.payButton}
          disabled={applePayButtonDisabled()}
        />
      </View>
    </View>
  );
}
