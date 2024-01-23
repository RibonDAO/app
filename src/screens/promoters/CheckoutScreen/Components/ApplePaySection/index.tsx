import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  createPlatformPayPaymentMethod,
  PlatformPay,
  PlatformPayButton,
} from "@stripe/stripe-react-native";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
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
import { PLATFORM } from "utils/constants/Application";
import InputText from "components/atomics/inputs/InputText";
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
};

export default function ApplePaySection({ offer, cause, nonProfit }: Props) {
  const [cart, setCart] = useState<any>([
    {
      label: "Total",
      amount: offer.priceValue.toString(),
      isPending: false,
      paymentType: PlatformPay.PaymentType.Immediate,
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
        isPending: false,
        paymentType: PlatformPay.PaymentType.Immediate,
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
  const [email, setEmail] = useState(currentUser?.email ?? undefined);

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
        createSource(user.id, integration.id);
      }
      setCurrentUser(user);
    }
  };

  const pay = async () => {
    showLoadingOverlay();
    const { error, paymentMethod } = await createPlatformPayPaymentMethod({
      applePay: {
        cartItems: cart,
        merchantCountryCode: "BR",
        currencyCode: offer.currency,
        requiredShippingAddressFields: [PlatformPay.ContactField.EmailAddress],
        requiredBillingContactFields: [
          PlatformPay.ContactField.Name,
          PlatformPay.ContactField.EmailAddress,
          PlatformPay.ContactField.PostalAddress,
        ],
      },
    });
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
        navigateTo("ContributionDoneScreen", {
          cause,
          nonProfit,
          offer,
        });
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

  const applePayButtonDisabled = () => showFiscalFields() && taxId.length < 14;

  return (
    <View>
      <View>
        {showFiscalFields() && (
          <InputText
            name="taxId"
            placeholder={field("taxId")}
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
