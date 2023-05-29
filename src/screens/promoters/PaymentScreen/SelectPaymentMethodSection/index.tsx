import { Text, View } from "react-native";
import RadioButton from "components/moleculars/RadioButton";
import CardIcon from "assets/images/payments/card-icon.png";
import GooglePayIcon from "assets/images/payments/google-pay-icon.png";
import ApplePayIcon from "assets/images/payments/apple-pay-icon.png";
import { useTranslation } from "react-i18next";
import styles from "../styles";

type Props = {
  onOptionChanged: (option: any) => void;
};
function SelectPaymentMethodSection({ onOptionChanged }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.paymentScreen",
  });

  const options = [
    { name: "Card", value: "card", id: 1, icon: CardIcon },
    {
      name: "Google Pay",
      value: "googlePay",
      id: 2,
      icon: GooglePayIcon,
    },
    {
      name: "Apple Pay",
      value: "applePay",
      id: 2,
      icon: ApplePayIcon,
    },
  ];

  return (
    <View>
      <Text style={styles.paymentMethodText}>{t("paymentMethodText")}</Text>
      <RadioButton
        options={options}
        onOptionChanged={(option) => {
          onOptionChanged(option);
        }}
      />
    </View>
  );
}

export default SelectPaymentMethodSection;
