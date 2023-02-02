import { TouchableOpacity } from "react-native";
import S from "./styles";
import { Text } from "react-native";

export type Props = {
  outline: boolean;
  onPress: () => void;
  backgroundColor: string;
  backgroundColorOutline: string;
  borderColor: string;
  borderColorOutline: string;
  textColorOutline: string;
  textColor: string;
  text: string;
};
function Button({
  outline,
  onPress,
  backgroundColor,
  backgroundColorOutline,
  borderColor,
  borderColorOutline,
  textColorOutline,
  textColor,
  text,
}: Props): JSX.Element {
  return (
    <TouchableOpacity
      style={[
        S.button,
        {
          backgroundColor: outline ? backgroundColorOutline : backgroundColor,
          borderColor: outline ? borderColorOutline : borderColor,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          fontWeight: "600",
          color: outline ? textColorOutline : textColor,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
