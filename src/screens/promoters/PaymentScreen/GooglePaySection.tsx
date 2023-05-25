import React, { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
import { StyleSheet, View } from "react-native";
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
import { logError } from "services/crashReport";

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

  const initialize = async () => {
    if (!(await isGooglePaySupported({ testEnv: true }))) return;

    const { error } = await initGooglePay({
      testEnv: true,
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
      const offerId = offer.id;
      const paymentMethodId = paymentMethod.id;
      const { email, name, address } = paymentMethod.billingDetails;
      const country = address?.country;
      const city = address?.city;
      const state = address?.state;
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

      try {
        await apiPost("/payments/google_pay", data);
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
