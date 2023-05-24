import React, { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
import { Alert, StyleSheet, View } from "react-native";
import { apiPost } from "@ribon.io/shared/services";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useTasksContext } from "contexts/tasksContext";
import { useNavigation } from "hooks/useNavigation";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import GooglePayLogo from "assets/images/payments/google-pay-logo.png";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyLgBold } from "styles/typography/default";

const styles = StyleSheet.create({
  row: {
    marginTop: 30,
  },
  payButton: {
    marginTop: 30,
    width: 182,
    height: 48,
  },
  standardButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderColor: theme.colors.neutral[100],
  },
  standardButtonText: {
    ...defaultBodyLgBold,
  },
  addToWalletButton: {
    marginTop: 30,
    width: 190,
    height: 60,
  },
});

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
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.paymentScreen",
  });

  // 1. Initialize Google Pay
  const initialize = async () => {
    if (!(await isGooglePaySupported({ testEnv: true }))) {
      Alert.alert("Google Pay is not supported.");
      return;
    }

    const { error } = await initGooglePay({
      testEnv: true,
      merchantName: "Test",
      countryCode: "BR",
      billingAddressConfig: {
        format: "FULL",
        isPhoneNumberRequired: true,
        isRequired: false,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });

    if (error) {
      Alert.alert(error.code, error.message);
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
      console.log("payment method error", error);
      Alert.alert(error.code, error.message);
      hideLoadingOverlay();
      return;
    } else if (paymentMethod) {
      console.log("payment method", paymentMethod);

      const offerId = offer.id;
      const paymentMethodId = paymentMethod.id;
      const { email } = paymentMethod.billingDetails;
      const { name } = paymentMethod.billingDetails;
      const country = paymentMethod.billingDetails?.address?.country;
      const city = paymentMethod.billingDetails?.address?.city;
      const state = paymentMethod.billingDetails?.address?.state;
      const integrationId = RIBON_INTEGRATION_ID;
      const causeId = cause?.id;
      const nonProfitId = nonProfit?.id;

      const data = {
        offerId,
        paymentMethodId,
        email,
        name,
        country,
        city,
        state,
        integrationId,
        causeId,
        nonProfitId,
      };

      console.log("data", data);
      apiPost("/payments/google_pay", data)
        .then((res) => {
          registerAction("contribution_done_screen_view");

          navigateTo("ContributionDoneScreen", {
            cause,
            nonProfit,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          hideLoadingOverlay();
        });
    }
    setInitialized(false);
  };

  return (
    <View>
      <View style={styles.row}>
        <Button
          text={t("payWithGooglePay")}
          onPress={createPaymentMethod}
          disabled={!initialized || loading}
          customStyles={styles.standardButton}
          textColorOutline={theme.colors.neutral[500]}
          customTextStyles={styles.standardButtonText}
          outline
          icon={GooglePayLogo}
        />
      </View>
    </View>
  );
}
