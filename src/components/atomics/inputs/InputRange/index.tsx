import React from "react";
import { theme } from "@ribon.io/shared/styles";
import { Slider } from "@miblanchard/react-native-slider";
import { View } from "react-native";
import styles from "./styles";

export type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: any) => void;
  color?: string;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
};

function InputRange({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
  color = theme.colors.green30,
  minimumTrackTintColor = theme.colors.green40,
  maximumTrackTintColor = theme.colors.green20,
}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Slider
        containerStyle={styles.slider}
        minimumValue={min}
        maximumValue={max}
        disabled={disabled}
        onValueChange={onChange}
        step={step}
        value={value}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbTintColor={color}
        thumbStyle={styles.thumb}
      />
    </View>
  );
}

export default InputRange;
