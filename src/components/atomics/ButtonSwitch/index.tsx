import { useState } from "react";
import { Switch } from "react-native";
import S from "./styles";
import { theme } from "@ribon.io/shared";
import { Text, View } from "components/Themed";

const { colors } = theme;
const { green30, neutral10 } = colors;

export type Props = {
  leftText: string;
  rightText: string;
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
      <View style={S.boxIcon}>
        <Text>{leftText}</Text>
      </View>
      <Switch
        onValueChange={() => handleChange()}
        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
        value={checked}
        trackColor={{ false: green30, true: green30 }}
        thumbColor={checked ? neutral10 : neutral10}
      />
      <View style={S.boxIcon}>
        <Text style={S.text}>{rightText}</Text>
      </View>
    </View>
  );
}

export default ButtonSwitch;
