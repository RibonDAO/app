import React, { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
import { StyleSheet, View } from "react-native";
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
import googlePayApi from "services/api/googlePayApi";

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
