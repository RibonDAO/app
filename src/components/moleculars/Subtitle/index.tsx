import React from "react";
import { View, Text } from "react-native";
import Icon, { Props as IconProps } from "components/atomics/Icon";
import S from "./styles";

export type Props = {
  text: string | JSX.Element | JSX.Element[];
  color?: string;
  icon: IconProps;
  secondaryColor: string;
  position?: "center" | "start";
};

function Subtitle({
  text,
  color,
  icon,
  secondaryColor,
  position,
}: Props): JSX.Element {
  return (
    <View
      style={[S.container, position === "center" && { alignItems: "center" }]}
    >
      <View
        style={[
          S.iconBox,
          { backgroundColor: secondaryColor || "#F0F0F0" },
          position === "center" && { alignItems: "center" },
        ]}
      >
        <Icon {...icon} />
      </View>
      <Text style={{ ...S.subtitle, color }}>{text}</Text>
    </View>
  );
}

export default Subtitle;
