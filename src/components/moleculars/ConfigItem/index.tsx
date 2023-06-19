import { Text, TouchableOpacity, View } from "react-native";
import S from "./styles";

type Props = {
  icon: () => JSX.Element;
  text: string;
  linkIcon?: () => JSX.Element;
  cta?: JSX.Element;
  onPress?: () => void;
  last?: boolean;
};

function ConfigItem({
  icon,
  text,
  cta,
  linkIcon,
  onPress,
  last,
}: Props): JSX.Element {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={{ ...S.configItem, ...(last && S.lastConfigItem) }}
      onPress={onPress && onPress}
    >
      <View style={S.iconContainer}>{icon()}</View>
      <View style={S.textContainer}>
        <Text style={S.text}>{text}</Text>
      </View>
      <View style={S.ctaContainer}>
        {cta && cta}
        {linkIcon && linkIcon()}
      </View>
    </TouchableOpacity>
  );
}

export default ConfigItem;
