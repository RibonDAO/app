import React from "react";
import { View, Text } from "react-native";
import Icon, { Props as IconProps } from "components/atomics/Icon";
import S from "./styles";

export type Props = {
  title: string;
  subtitle?: string;
  icon: IconProps;
  secondaryColor: string;
};

function Title({ title, icon, secondaryColor, subtitle }: Props): JSX.Element {
  return (
    <View
      style={[S.container, { alignItems: subtitle ? "flex-start" : "center" }]}
    >
      <View
        style={[S.iconBox, { backgroundColor: secondaryColor || "#F0F0F0" }]}
      >
        <Icon {...icon} />
      </View>
      <View style={S.textContainer}>
        <Text style={S.title}>{title}</Text>
        {subtitle && <Text style={S.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

export default Title;
