import { useEffect } from "react";
import { View } from "react-native";
import InputText from "components/atomics/inputs/InputText";
import { useTranslation } from "react-i18next";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import S from "./styles";

function CreditCardForm(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen.paymentMethodSection.creditCardFields",
  });

  const {
    number,
    name,
    expirationDate,
    cvv,
    setNumber,
    setName,
    setExpirationDate,
    setCvv,
    setButtonDisabled,
  } = useCardPaymentInformation();

  useEffect(() => {
    setButtonDisabled(
      !(number && name && !expirationDate.includes("_") && cvv.length >= 3),
    );
  }, [number, name, expirationDate, cvv]);

  return (
    <View style={S.container}>
      <InputText
        name="number"
        key="number"
        placeholder={t("number")}
        mask="9999 9999 9999 9999"
        value={number}
        onChangeText={(value) => setNumber(value)}
        maxLength={19}
        keyboardType="numeric"
        style={{ display: "flex", flex: 1 }}
        testID="number"
      />
      <InputText
        name="name"
        key="name"
        placeholder={t("name")}
        value={name}
        onChangeText={(value) => setName(value)}
        style={{ display: "flex", flex: 1 }}
        testID="name"
      />
      <View style={S.half}>
        <InputText
          name="expirationDate"
          key="expirationDate"
          value={expirationDate}
          placeholder={t("expirationDate")}
          mask="99/9999"
          autoComplete="cc-exp"
          onChangeText={(value) => setExpirationDate(value)}
          maxLength={7}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
          containerStyle={{ width: "48%" }}
          testID="expirationDate"
        />
        <InputText
          name="cvv"
          key="cvv"
          placeholder={t("cvv")}
          maxLength={4}
          value={cvv}
          onChangeText={(value) => setCvv(value)}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
          containerStyle={{ width: "48%" }}
          testID="cvv"
        />
      </View>
    </View>
  );
}

export default CreditCardForm;
