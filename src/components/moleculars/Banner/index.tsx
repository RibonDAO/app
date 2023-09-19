/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { theme } from "@ribon.io/shared/styles";
import React from "react";
import Icon, { Props as IconProps } from "components/atomics/Icon";
import ArrowRight from "components/vectors/ArrowRight";
import { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import {
  defaultBodyMdSemibold,
  defaultBodySmSemibold,
  defaultHeadingXxs,
} from "styles/typography/default";

import { darken } from "polished";
import S from "./styles";

const { primary, secondary } = theme.colors.brand;

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
  backgroundColor = secondary[100],
  children,
  arrowLinkColor = primary[800],
  onArrowClick,
  withCircle = false,
}: Props): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (onArrowClick) {
      onArrowClick();
      setIsPressed(!isPressed);
    }
  };
  const pressStyle = {
    backgroundColor: isPressed ? darken(0.1, backgroundColor) : backgroundColor,
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
      style={[S.container, { ...pressStyle }]}
      onPress={handleClick}
    >
      {!isPressed && (
        <Image
          source={cardBackground}
          resizeMode="contain"
          style={{
            position: "absolute",
            height: " 100%",
            right: -16,
          }}
        />
      )}
      <View style={S.content}>
        <View style={S.iconText}>
          {icon && (
            <View
              style={[S.iconContainer, withCircle ? S.circle : S.iconContainer]}
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
    </TouchableOpacity>
  );
}

export default Banner;
