import React, { useEffect, useState } from "react";
import { GooglePayButton, useGooglePay } from "@stripe/stripe-react-native";
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
import S from "./styles";

type Props = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
};
export default function GooglePaySection({ offer, cause, nonProfit }: Props) {
  const { registerAction } = useTasksContext();
  const { currentIntegrationId } = useIntegrationContext();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { isGooglePaySupported, initGooglePay, createGooglePayPaymentMethod } =
    useGooglePay();
  const [initialized, setInitialized] = useState(false);
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

  const testEnv = false;

  useEffect(() => {
    logEvent("selectGooglePay_click");
  }, []);

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
        createSource(user.id, integration.id);
      }
      setCurrentUser(user);
    }
  };

  const createPaymentMethod = async () => {
    showLoadingOverlay();
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: offer.priceCents,
      currencyCode: offer.currency,
    });

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
        showToast({
          type: "error",
          message: t("onErrorMessage", "error"),
        });
      } finally {
        hideLoadingOverlay();
      }
    }
  };

  const googlePayButtonDisabled = () => showFiscalFields() && taxId.length < 14;

  return (
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
      {initialized && (
        <GooglePayButton
          onPress={createPaymentMethod}
          style={S.payButton}
          disabled={googlePayButtonDisabled()}
        />
      )}
    </View>
  );
}
