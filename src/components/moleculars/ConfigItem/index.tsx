import Icon from "components/atomics/Icon";
import { Text, Pressable, View } from "react-native";
import S from "./styles";

type IconProps = {
  name: string;
  type: "rounded" | "sharp" | "outlined";
  color?: string;
  size?: number;
};

type Props = {
  icon: IconProps;
  text: string;
  linkIcon?: () => JSX.Element;
  cta?: JSX.Element;
  onPress?: () => void;
  last?: boolean;
  hitSlop?: number;
};

function ConfigItem({
  icon,
  text,
  cta,
  linkIcon,
  onPress,
  last,
  hitSlop,
}: Props): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          ...S.configItem,
          ...(last && S.lastConfigItem),
          ...(pressed && S.pressedConfigItem),
        },
      ]}
      onPress={onPress && onPress}
      hitSlop={hitSlop}
    >
      <View style={S.iconContainer}>
        <Icon
          name={icon.name}
          type={icon.type}
          color={icon.color}
          size={icon.size}
        />
      </View>
      <View style={S.textContainer}>
        <Text style={S.text}>{text}</Text>
      </View>
      <View style={S.ctaContainer}>
        {cta && cta}
        {linkIcon && linkIcon()}
      </View>
    </Pressable>
  );
}

export default ConfigItem;
