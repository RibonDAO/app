import { Text, View } from "components/Themed";
import S from "./styles";

type Props = {
  icon: () => JSX.Element;
  text: string;
  linkIcon?: () => JSX.Element;
  cta?: JSX.Element;
}

function ConfigItem({ icon, text, cta, linkIcon }: Props): JSX.Element {
  return (
    <View style={S.configItem}>
      <View style={S.iconContainer}>
        {icon()}
      </View>
      <View style={S.textContainer}>
        <Text style={S.text}>{text}</Text>
      </View>
      <View style={S.ctaContainer}>
        {cta && cta}
        {linkIcon && linkIcon()}
      </View>
    </View>
  );
}

export default ConfigItem;
