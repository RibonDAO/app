/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { theme } from "@ribon.io/shared/styles";
import { TouchableOpacity, View, Text, Image } from "react-native";
import {
  defaultBodyMdSemibold,
  defaultBodySmSemibold,
  defaultHeadingXxs,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

import S from "./styles";

const { secondary } = theme.colors.brand;

export type TitleProps = {
  text: string;
  size?: string;
  color?: string;
  stylized?: boolean;
};

export type Props = {
  squareImage?: string;
  title?: TitleProps;
  subtitle?: TitleProps;
  text?: string;
  textColor?: string;
  backgroundColor?: string | undefined;
};

function BannerInfo({
  squareImage,
  title,
  subtitle,
  text,
  textColor,
  backgroundColor = secondary[100],
}: Props): JSX.Element {
  const titleSize = () => {
    switch (title?.size) {
      case "small":
        return defaultBodySmSemibold;
      case "medium":
        return defaultBodyMdSemibold;
      case "large":
        return defaultHeadingXxs;
      default:
        return defaultBodyMdSemibold;
    }
  };

  const titleStyle = () => (title?.stylized ? stylizedDisplayXs : titleSize());

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[S.container, { backgroundColor }]}
    >
      {squareImage && (
        <View style={S.squareImageContainer}>
          <Image
            source={{ uri: squareImage }}
            style={{ width: 84, height: 84, resizeMode: "contain" }}
          />
        </View>
      )}
      <View style={S.titleContainer}>
        {title && (
          <Text style={[S.title, { color: title.color, ...titleStyle() }]}>
            {title.text}
          </Text>
        )}
        {text && <Text style={[S.text, { color: textColor }]}>{text}</Text>}
      </View>
      {subtitle && (
        <Text style={[S.title, { color: subtitle.color }]}>
          {subtitle.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default BannerInfo;
