import React, { useEffect, useState } from "react";
import { GooglePayButton, useGooglePay } from "@stripe/stripe-react-native";
import { Alert, StyleSheet, View } from "react-native";

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
    width: 90,
    height: 40,
  },
  addToWalletButton: {
    marginTop: 30,
    width: 190,
    height: 60,
  },
});
export default function GooglePayScreen() {
  const {
    isGooglePaySupported,
    initGooglePay,
    presentGooglePay,
    loading,
    createGooglePayPaymentMethod,
  } = useGooglePay();
  const [initialized, setInitialized] = useState(false);

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

  const fetchPaymentIntentClientSecret = async () => {
    const clientSecret = "";

    return clientSecret;
  };

  const pay = async () => {
    // 2. Fetch payment intent client secret
    const clientSecret = await fetchPaymentIntentClientSecret();

    // 3. Open Google Pay sheet and proceed a payment
    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    });

    console.log(error);
    if (error) {
      Alert.alert(error.code, error.message);
      return;
    }
    Alert.alert("Success", "The payment was confirmed successfully.");
    setInitialized(false);
  };

  /*
    As an alternative you can only create a paymentMethod instead of confirming the payment.
  */
  const createPaymentMethod = async () => {
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: 12,
      currencyCode: "USD",
    });

    if (error) {
      console.log("payment method error", error);
      Alert.alert(error.code, error.message);
      return;
    } else if (paymentMethod) {
      Alert.alert(
        "Success",
        `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`,
      );
    }
    setInitialized(false);
  };

  return (
    <View>
      <GooglePayButton
        disabled={!initialized || loading}
        style={styles.payButton}
        type="pay"
        onPress={pay}
      />

      <View style={styles.row}>
        <GooglePayButton
          disabled={!initialized || loading}
          style={styles.standardButton}
          type="standard"
          onPress={createPaymentMethod}
        />
      </View>
    </View>
  );
}
