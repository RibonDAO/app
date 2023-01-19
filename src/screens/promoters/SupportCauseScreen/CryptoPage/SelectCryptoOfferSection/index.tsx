import { theme } from "@ribon.io/shared/styles";
import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "components/Themed";
import InputRange from "components/atomics/inputs/InputRange";
import { useState } from "react";
import { Dimensions, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const { gray20, orange40 } = theme.colors;

type Props = {
  cause: Cause | undefined;
  onValueChange: (value: number) => void;
};

function SelectCryptoOfferSection({
  cause,
  onValueChange,
}: Props): JSX.Element {
  const [currentValue, setCurrentValue] = useState(5);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage.selectOfferSection",
  });

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
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
      <TextInput
        value={currentValue.toString()}
        onChange={(e) => {
          handleValueChange(parseInt(e.nativeEvent.text || "0", 10));
        }}
        style={styles.inputText}
      />
      <InputRange
        value={currentValue}
        min={5}
        step={5}
        max={100}
        onChange={handleValueChange}
        color={orange40}
        minimumTrackTintColor={orange40}
        maximumTrackTintColor={gray20}
      />
    </View>
  );
}

export default SelectCryptoOfferSection;
