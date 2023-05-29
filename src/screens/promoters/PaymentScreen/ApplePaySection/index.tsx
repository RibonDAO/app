import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  ApplePayButton,
  useApplePay,
  ApplePay,
} from "@stripe/stripe-react-native";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import googlePayApi from "services/api/googlePayApi";
import { logError } from "services/crashReport";
import { useTasksContext } from "contexts/tasksContext";
import { useNavigation } from "hooks/useNavigation";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
};
export default function ApplePaySection({ offer, cause, nonProfit }: Props) {
  const [cart] = useState<ApplePay.CartSummaryItem[]>([
    {
      label: "Total",
      amount: offer.priceValue.toString(),
      isPending: true,
      paymentType: "Immediate",
    },
  ]);
  const { registerAction } = useTasksContext();
  const { presentApplePay, isApplePaySupported } = useApplePay();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const pay = async () => {
    showLoadingOverlay();
    const { error, paymentMethod } = await presentApplePay({
      cartItems: cart,
      country: "BR",
      currency: offer.currency,
      requiredShippingAddressFields: ["emailAddress", "postalAddress", "name"],
      requiredBillingContactFields: ["name"],
      jcbEnabled: true,
    });

    if (error) {
      console.log(error.code, error.message);
    } else if (paymentMethod) {
      const { email, name, address } = paymentMethod.billingDetails;
      const integrationId = RIBON_INTEGRATION_ID;

      const data = {
        offerId: offer.id,
        paymentMethodId: paymentMethod.id,
        email,
        name,
        country: address?.country,
        city: address?.city,
        state: address?.state,
        integrationId,
        causeId: cause?.id,
        nonProfitId: nonProfit?.id,
      };

      try {
        await googlePayApi.postGooglePay(data);
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
      <View>
        <Text>{JSON.stringify(cart, null, 2)}</Text>
      </View>
      {isApplePaySupported && (
        <View>
          <ApplePayButton
            onPress={pay}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={S.payButton}
          />
        </View>
      )}
    </View>
  );
}
