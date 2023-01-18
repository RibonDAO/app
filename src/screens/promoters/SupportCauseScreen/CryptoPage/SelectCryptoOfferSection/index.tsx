import { theme } from "@ribon.io/shared/styles";
import { Cause } from "@ribon.io/shared/types";
import { View } from "components/Themed";
import InputRange from "components/atomics/inputs/InputRange";
import { useState } from "react";
import { Dimensions } from "react-native";

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

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    onValueChange(value);
  };

  return (
    <View
      style={{
        width: Dimensions.get("window").width - 32,
      }}
    >
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
