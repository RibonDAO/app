import { theme } from "@ribon.io/shared/styles";
import { View, Text } from "react-native";
import S from "./styles";
import { useRef } from "react";

export type Props = {
  value: number;
  min: number;
  max: number;
};
function ProgressBar({ value, min, max }: Props): JSX.Element {
  const percentage = (value / max) * 100;
  const wrapperRef = useRef(null);
  return (
    <View style={S.section} ref={wrapperRef}>
      <View
        style={{
          ...S.progress,
          ...{ width: `${percentage}%` },
        }}
      />
      <Text style={S.text}>
        {value}/{max}
      </Text>
    </View>
  );
}

export default ProgressBar;
