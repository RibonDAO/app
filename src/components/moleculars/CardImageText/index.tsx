import { View, Text, TextStyle } from "react-native";
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
};

function CardImageText({
  title,
  text,
  footerText,
  image,
  subtitle,
  subtitleStyle,
  textStyle,
  titleStyle,
  footerTextStyle,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.insideContainer}>
        {image && <Image source={{ uri: image }} style={S.image} />}
        {subtitle && (
          <Text style={[S.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
        {title && <Text style={[S.title, titleStyle]}>{title}</Text>}
        {text && <Text style={[S.text, textStyle]}>{text}</Text>}
      </View>
      {footerText && (
        <Text style={[S.footerText, footerTextStyle]}>{footerText}</Text>
      )}
    </View>
  );
}

export default CardImageText;
