import { View, Text, TextStyle, TouchableOpacity } from "react-native";
import Image from "components/atomics/Image";
import S from "./styles";

export type Props = {
  title?: string | JSX.Element;
  titleStyle?: TextStyle;
  subtitle?: string | JSX.Element;
  subtitleStyle?: TextStyle;
  text?: string | JSX.Element;
  textStyle?: TextStyle;
  footerText?: string | JSX.Element;
  footerTextStyle?: TextStyle;
  image?: string;
  label?: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

function CardImageText({
  title,
  text,
  footerText,
  image,
  subtitle,
  label,
  subtitleStyle,
  textStyle,
  titleStyle,
  footerTextStyle,
  buttonText,
  onButtonPress,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.insideContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={S.image}
            accessibilityIgnoresInvertColors
          />
        )}
        {subtitle && (
          <Text style={[S.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
        {title && <Text style={[S.title, titleStyle]}>{title}</Text>}
        {text && <Text style={[S.text, textStyle]}>{text}</Text>}
        {label && (
          <View style={S.labelContainer}>
            <Text style={S.label}>{label}</Text>
          </View>
        )}
      </View>
      {footerText && (
        <Text style={[S.footerText, footerTextStyle]}>{footerText}</Text>
      )}
      {buttonText && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onButtonPress}
          style={S.button}
        >
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CardImageText;
