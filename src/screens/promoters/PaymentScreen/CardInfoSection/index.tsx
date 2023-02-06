import InputText from "components/atomics/inputs/InputText";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { maskToCreditCard, maskToExpirationDate } from "@ribon.io/shared/lib";
import getThemeByFlow from "lib/themeByFlow";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { View } from "react-native";
import S from "./styles";
import { theme } from "@ribon.io/shared";

function CardInfoSection() {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportCauseScreen.paymentScreen.paymentInformationSection",
  });

  const {
    email,
    setEmail,
    name,
    setName,
    number,
    setNumber,
    expirationDate,
    setExpirationDate,
    cvv,
    setCvv,
    setButtonDisabled,
    flow,
  } = useCardPaymentInformation();

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    logEvent("treasureSupportPayment_view");
  }, []);

  const maskExpiration = (value: string) => {
    setExpirationDate(maskToExpirationDate(value));
  };

  const maskCreditCard = (value: string) => {
    setNumber(maskToCreditCard(value));
  };

  const colorTheme = getThemeByFlow(flow);

  useEffect(() => {
    setButtonDisabled(
      !(email && number && name && expirationDate && cvv.length >= 3),
    );
  }, [email, number, name, expirationDate, cvv]);

  const inputStyles = {
    borderColor: colorTheme.shade40,
    color: colorTheme.shade20,
  };

  return (
    <View style={S.container}>
      <InputText
        style={inputStyles}
        name="email"
        placeholder={t("email")}
        value={email}
        onChangeText={(value) => setEmail(value)}
        disabled={!!currentUser?.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputText
        style={inputStyles}
        name="number"
        placeholder={t("cardNumber")}
        value={number}
        onChangeText={maskCreditCard}
        maxLength={19}
        keyboardType="numeric"
      />
      <InputText
        style={inputStyles}
        name="name"
        placeholder={t("cardName")}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <View style={S.half}>
        <InputText
          style={inputStyles}
          name="expirationDate"
          value={expirationDate}
          placeholder={t("cardDueDate")}
          onChangeText={maskExpiration}
          maxLength={7}
          keyboardType="numeric"
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
        />
        <InputText
          style={inputStyles}
          name="cvv"
          placeholder={t("cvv")}
          maxLength={4}
          value={cvv}
          onChangeText={(value) => setCvv(value)}
          keyboardType="numeric"
          containerStyle={{ marginLeft: theme.spacingNative(4), flex: 1 }}
        />
      </View>
    </View>
  );
}

export default CardInfoSection;
