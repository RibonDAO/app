import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
  Text,
} from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import S from "./styles";

export type LeftIconProps = {
  color?: string;
  size?: number;
  name: string;
  type: "sharp" | "rounded" | "outlined";
};

export type Props = {
  text: string;
  disabled?: boolean;
  outline?: boolean;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
  textColorOutline?: string;
  textColor?: string;
  leftIcon?: LeftIconProps;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  leftItem?: JSX.Element;
};

const { primary } = theme.colors.brand;

export default function ButtonNonClickable({
  text,
  backgroundColor = primary[300],
  borderColor = primary[300],
  textColor = primary[900],
  customStyles = {},
  customTextStyles = {},
  leftIcon,
  leftItem,
}: Props): JSX.Element {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        S.container,
        {
          backgroundColor,
          borderColor,
        },
        customStyles,
      ]}
      disabled
      testID={`button-${text}`}
    >
      {leftIcon && <Icon {...leftIcon} style={S.leftIcon} />}
      {leftItem && <View style={S.leftItem}>{leftItem && leftItem}</View>}
      <Text style={[S.text, { color: textColor }, customTextStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
