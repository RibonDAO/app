import { Text, TouchableOpacity, View } from "react-native";
import S from "./styles";

type Props = {
  icon: () => JSX.Element;
  text: string;
  linkIcon?: () => JSX.Element;
  cta?: JSX.Element;
  onPress?: () => void;
};

function ConfigItem({ icon, text, cta, linkIcon, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity style={S.configItem} onPress={onPress && onPress}>
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
