import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ApplePayButton,
  useApplePay,
  ApplePay,
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
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
};

export default function ApplePaySection({ offer, cause, nonProfit }: Props) {
  const [cart, setCart] = useState<ApplePay.CartSummaryItem[]>([
    {
      label: "Total",
      amount: offer.priceValue.toString(),
      isPending: false,
      paymentType: "Immediate",
    },
  ]);

  useEffect(() => {
    setCart([
      {
        label: "Total",
        amount: offer.priceValue.toString(),
        isPending: false,
        paymentType: "Immediate",
      },
    ]);
  }, [offer]);

  const { registerAction } = useTasksContext();
  const { currentIntegrationId } = useIntegrationContext();

  const { presentApplePay, isApplePaySupported, confirmApplePayPayment } =
    useApplePay();
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
    const { error, paymentMethod } = await presentApplePay({
      cartItems: cart,
      country: "BR",
      currency: offer.currency,
      requiredShippingAddressFields: ["emailAddress"],
      requiredBillingContactFields: ["name", "emailAddress", "postalAddress"],
      jcbEnabled: true,
    });

    if (error) {
      hideLoadingOverlay();
      console.log("error", error);
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
      };

      try {
        const response = await storePayApi.postStorePay(data);
        await confirmApplePayPayment(response.data.clientSecret);
        registerAction("contribution_done_screen_view");
        console.log(response);
        navigateTo("ContributionDoneScreen", {
          cause,
          nonProfit,
          offer,
        });
      } catch (e) {
        logError(e);
        console.log("e", e);
        showToast({
          type: "error",
          message: t("onErrorMessage", "error"),
        });
      } finally {
        hideLoadingOverlay();
      }
    }
  };

  return (
    <View>
      {isApplePaySupported && (
        <View>
          <ApplePayButton
            onPress={pay}
            type="donate"
            buttonStyle="black"
            borderRadius={4}
            style={S.payButton}
          />
        </View>
      )}
    </View>
  );
}
