import React, { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
import { View } from "react-native";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useTasksContext } from "contexts/tasksContext";
import { useNavigation } from "hooks/useNavigation";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { logError } from "services/crashReport";
import storePayApi from "services/api/storePayApi";
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
};
export default function GooglePaySection({ offer, cause, nonProfit }: Props) {
  const { registerAction } = useTasksContext();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const {
    isGooglePaySupported,
    initGooglePay,
    loading,
    createGooglePayPaymentMethod,
  } = useGooglePay();
  const [initialized, setInitialized] = useState(false);
  const testEnv = true;

  const initialize = async () => {
    if (!(await isGooglePaySupported({ testEnv }))) return;

    const { error } = await initGooglePay({
      testEnv,
      merchantName: "Ribon",
      countryCode: "BR",
      billingAddressConfig: {
        format: "FULL",
        isPhoneNumberRequired: false,
        isRequired: true,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });

    if (error) {
      logError(error);
      return;
    }
    setInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const createPaymentMethod = async () => {
    showLoadingOverlay();
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: offer.priceCents,
      currencyCode: offer.currency,
    });

    if (error) {
      logError(error);
      hideLoadingOverlay();
      return;
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
        paymentMethodType: "google_pay",
      };

      try {
        await storePayApi.postStorePay(data);
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
    setInitialized(false);
  };

  return (
    <View>
      <View style={S.row}>
        <Button
          text="Google Pay"
          onPress={createPaymentMethod}
          disabled={!initialized || loading}
          customStyles={S.standardButton}
          textColorOutline={theme.colors.neutral[500]}
          customTextStyles={S.standardButtonText}
          outline
        />
      </View>
    </View>
  );
}
