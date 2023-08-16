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
    } else if (paymentMethod) {
      const { email, name, address } = paymentMethod.billingDetails;

      const data = {
        offerId: offer.id,
        paymentMethodId: paymentMethod.id,
        email,
        name,
        country: address?.country,
        city: address?.city,
        state: address?.state,
        currentIntegrationId,
        causeId: cause?.id,
        nonProfitId: nonProfit?.id,
        paymentMethodType: "apple_pay",
      };

      try {
        const response = await storePayApi.postStorePay(data);
        await confirmApplePayPayment(response.data.clientSecret);
        registerAction("contribution_done_screen_view");

        navigateTo("ContributionDoneScreen", {
          cause,
          nonProfit,
        });
      } catch (e) {
        logError(e);
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
