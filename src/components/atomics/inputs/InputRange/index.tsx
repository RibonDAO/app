import React from "react";
import { theme } from "@ribon.io/shared/styles";
import { Slider } from "@miblanchard/react-native-slider";
import { View, ViewStyle } from "react-native";
import styles from "./styles";
import {useScrollEnabled} from "contexts/scrollEnabledContext";

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
  sliderStyle?: ViewStyle;
};

const { primary } = theme.colors.brand;

function InputRange({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
  color = primary[300],
  minimumTrackTintColor = primary[800],
  maximumTrackTintColor = primary[200],
  sliderStyle,
}: Props): JSX.Element {
  const { setScrollEnabled } = useScrollEnabled();

  return (
    <View style={styles.container}>
      <Slider
        containerStyle={{ ...styles.slider, ...sliderStyle }}
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
        onSlidingStart={() => setScrollEnabled(false)}
        onSlidingComplete={() => setScrollEnabled(true)}
      />
    </View>
  );
}

export default InputRange;
