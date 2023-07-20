import { theme } from "@ribon.io/shared/styles";
import Icon, { Props as IconProps } from "components/atomics/Icon";
import ArrowRight from "components/vectors/ArrowRight";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import {
  defaultBodyMdSemibold,
  defaultBodySmSemibold,
  defaultHeadingXxs,
} from "styles/typography/default";

import S from "./styles";

const { primary } = theme.colors.brand;

export type TitleProps = {
  text: string;
  size?: string;
  color?: string;
};

export type Props = {
  icon?: IconProps;
  title?: TitleProps;
  subtitle?: TitleProps;
  text?: string;
  textColor?: string;
  cardBackground?: any;
  backgroundColor?: string | undefined;
  children?: JSX.Element | JSX.Element[];
  arrowLinkColor?: string;
  onArrowClick?: () => void;
  withCircle?: boolean;
};

function Banner({
  icon,
  title,
  subtitle,
  text,
  textColor,
  cardBackground,
  backgroundColor,
  children,
  arrowLinkColor = primary[800],
  onArrowClick,
  withCircle = false,
}: Props): JSX.Element {
  const handleClick = () => {
    if (onArrowClick) onArrowClick();
  };

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

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[S.container, { backgroundColor }]}
      onPress={handleClick}
    >
      <ImageBackground
        source={cardBackground}
        resizeMode="contain"
        resizeMethod="resize"
        style={S.background}
      >
        <View style={S.content}>
          <View style={S.iconText}>
            {icon && (
              <View
                style={[
                  S.iconContainer,
                  withCircle ? S.circle : S.iconContainer,
                ]}
              >
                <Icon {...icon} />
              </View>
            )}
            <View style={S.titleContainer}>
              {title && (
                <Text style={[S.title, { color: title.color, ...titleSize() }]}>
                  {title.text}
                </Text>
              )}
            </View>
          </View>
          {subtitle && (
            <Text style={[S.title, { color: subtitle.color }]}>
              {subtitle.text}
            </Text>
          )}
          <View style={S.textContainer}>
            {text && <Text style={(S.text, { color: textColor })}>{text}</Text>}
            {children && <View style={S.childrenContainer}>{children}</View>}

            {onArrowClick && (
              <View style={S.arrowContainer}>
                <ArrowRight color={arrowLinkColor} />
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Banner;
