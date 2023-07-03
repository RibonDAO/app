import InputText from "components/atomics/inputs/InputText";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import S from "./styles";

export type Props = {
  data: {
    name: string;
    number: string;
    expirationDate: string;
    cvv: string;
  };
  setData: (data: any) => void;
};

function CreditCardForm({ data, setData }: Props): JSX.Element {
  const setFieldValue = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2.paymentMethodSection.creditCardFields",
  });

  return (
    <View style={S.container}>
      <InputText
        name="number"
        placeholder={t("number")}
        mask="9999 9999 9999 9999"
        value={data.number}
        onChangeText={(value) => setFieldValue("number", value)}
        maxLength={19}
        keyboardType="numeric"
        style={{ display: "flex", flex: 1 }}
        testID="number"
      />
      <InputText
        name="name"
        placeholder={t("name")}
        value={data.name}
        onChangeText={(value) => setFieldValue("name", value)}
        style={{ display: "flex", flex: 1 }}
        testID="name"
      />
      <View style={S.half}>
        <InputText
          name="expirationDate"
          value={data.expirationDate}
          placeholder={t("expirationDate")}
          mask="99/9999"
          autoComplete="cc-exp"
          onChangeText={(value) => setFieldValue("expirationDate", value)}
          maxLength={7}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
          containerStyle={{ width: "48%" }}
          testID="expirationDate"
        />
        <InputText
          name="cvv"
          placeholder={t("cvv")}
          maxLength={4}
          value={data.cvv}
          onChangeText={(value) => setFieldValue("cvv", value)}
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
