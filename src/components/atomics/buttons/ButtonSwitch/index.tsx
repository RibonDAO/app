import { useState } from "react";
import { Switch } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { Text, View } from "react-native";
import S from "./styles";

const { colors } = theme;
const { neutral10 } = colors;
const { primary } = theme.colors.brand;

export type Props = {
  leftText?: string;
  rightText?: string;
  onSwitch?: (checked: boolean) => void;
  initialCheckState?: boolean;
};
function ButtonSwitch({
  leftText,
  rightText,
  onSwitch,
  initialCheckState = false,
}: Props): JSX.Element {
  const [checked, setChecked] = useState(initialCheckState);

  const handleChange = () => {
    setChecked(!checked);
    if (onSwitch) onSwitch(checked);
  };

  return (
    <View style={S.container}>
      {leftText && (
        <View style={S.boxIcon}>
          <Text>{leftText}</Text>
        </View>
      )}
      <Switch
        onValueChange={() => handleChange()}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        value={checked}
        trackColor={{ false: primary[300], true: primary[300] }}
        thumbColor={checked ? neutral10 : neutral10}
      />
      {rightText && (
        <View style={S.boxIcon}>
          <Text style={S.text}>{rightText}</Text>
        </View>
      )}
    </View>
  );
}

export default ButtonSwitch;
