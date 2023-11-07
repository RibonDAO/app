import InputText from "components/atomics/inputs/InputText";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useCheckoutContext } from "contexts/checkoutContext";
import S from "./styles";

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
  } = useCheckoutContext();

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setButtonDisabled(
      !(email && number && name && expirationDate && cvv.length >= 3),
    );
  }, [email, number, name, expirationDate, cvv]);

  return (
    <View style={S.container}>
      <InputText
        name="email"
        placeholder={t("email")}
        value={email}
        onChangeText={(value) => setEmail(value)}
        disabled={!!currentUser?.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputText
        name="number"
        placeholder={t("cardNumber")}
        mask="9999 9999 9999 9999"
        value={number}
        onChangeText={(value) => setNumber(value)}
        maxLength={19}
        keyboardType="numeric"
      />
      <InputText
        name="name"
        placeholder={t("cardName")}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <View style={S.half}>
        <InputText
          name="expirationDate"
          value={expirationDate}
          placeholder={t("cardDueDate")}
          mask="99/9999"
          autoComplete="cc-exp"
          onChangeText={(value) => setExpirationDate(value)}
          maxLength={7}
          keyboardType="numeric"
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
        />
        <InputText
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
