import React from "react";
import { View, Text, TouchableOpacity, ImageRequireSource } from "react-native";
import Icon, { Props as IconProps } from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import Image from "components/atomics/Image";
import { logEvent } from "services/analytics";
import S from "./styles";

type TitleProps = {
  text: string;
  size?: number;
  color?: string;
};

type Props = {
  icon?: IconProps;
  title?: TitleProps;
  subtitle?: TitleProps;
  text?: string;
  textColor?: string;
  cardBackground?: { uri: string } | ImageRequireSource;
  children?: React.ReactNode;
  arrowLinkColor?: string;
  onArrowClick?: () => void;
  source?: string;
};

function Banner({
  icon,
  title,
  subtitle,
  text,
  textColor,
  cardBackground,
  children,
  arrowLinkColor = theme.colors.brand.secondary[800],
  onArrowClick,
  source,
}: Props) {
  const handleClick = () => {
    if (onArrowClick) onArrowClick();
    logEvent("supportBtn_click", { from: source });
  };

  const flexDirection = onArrowClick ? "row" : "column";

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={handleClick}
      style={S.outerContainer}
    >
      <View style={[S.container, { flexDirection }]}>
        <View style={S.content}>
          <View style={S.iconText}>
            {icon && (
              <View style={S.iconContainer}>
                <Icon {...icon} />
              </View>
            )}
            <View style={S.titleContainer}>
              {title && (
                <Text
                  style={[
                    S.title,
                    { color: title.color, fontSize: title.size },
                  ]}
                >
                  {title.text}
                </Text>
              )}
            </View>
          </View>
          {subtitle && (
            <Text
              style={[
                S.subtitle,
                { color: subtitle.color, fontSize: subtitle.size },
              ]}
            >
              {subtitle.text}
            </Text>
          )}

          {text && <Text style={[S.text, { color: textColor }]}>{text}</Text>}
          {children && <View style={S.childrenContainer}>{children}</View>}
        </View>
        {onArrowClick && (
          <View style={S.arrowContainer}>
            <TouchableOpacity accessibilityRole="button" onPress={handleClick}>
              <Icon
                type="rounded"
                name="chevron_right"
                size={40}
                color={arrowLinkColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {cardBackground && (
        <Image
          source={cardBackground}
          style={S.image}
          accessibilityIgnoresInvertColors
        />
      )}
    </TouchableOpacity>
  );
}

export default Banner;
