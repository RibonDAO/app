import { theme } from "@ribon.io/shared/styles";
import { Cause, Currencies } from "@ribon.io/shared/types";
import { Text, View } from "react-native";
import InputRange from "components/atomics/inputs/InputRange";
import { Dimensions, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import Dropdown from "components/moleculars/Dropdown";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import styles from "./styles";

const { gray20, orange40 } = theme.colors;

type Props = {
  cause: Cause | undefined;
  onValueChange: (value: string) => void;
};

function SelectCryptoOfferSection({
  cause,
  onValueChange,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.selectOfferSection",
  });
  const { tokenSymbol, amount, setAmount, setIsInCryptoPage } =
    useCryptoPayment();
  const { setCurrentCoin } = useCardPaymentInformation();

  const handleValueChange = (value: string) => {
    setAmount(value);
    onValueChange(value);
  };

  return (
    <View
      style={{
        width: Dimensions.get("window").width - 132,
      }}
    >
      <Text style={styles.title}>
        {t("causeText")} {cause?.name}
      </Text>
      <View style={styles.inputsContainer}>
        <TextInput
          value={amount.toString()}
          onChange={(e) => {
            handleValueChange(e.nativeEvent.text);
          }}
          style={styles.inputText}
          keyboardType="numeric"
        />
        <Dropdown
          items={[
            { label: tokenSymbol, value: tokenSymbol },
            { label: Currencies.USD, value: Currencies.USD },
            { label: Currencies.BRL, value: Currencies.BRL },
          ]}
          onSelect={({ value }) => {
            if (value !== tokenSymbol) {
              setIsInCryptoPage(false);
              setCurrentCoin(value as Currencies);
            }
          }}
          label={tokenSymbol}
          containerStyle={styles.dropdownContainerStyles}
        />
      </View>
      <InputRange
        value={parseFloat(amount)}
        min={5}
        step={5}
        max={100}
        onChange={(value) => {
          const changeValue = Array.isArray(value) ? value[0] : value;
          handleValueChange(changeValue.toString());
        }}
        color={orange40}
        minimumTrackTintColor={orange40}
        maximumTrackTintColor={gray20}
      />
    </View>
  );
}

export default SelectCryptoOfferSection;
