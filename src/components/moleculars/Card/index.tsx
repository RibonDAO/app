import React from "react";
import { View } from "react-native";
import S from "./styles";

export type Props = {
  children: JSX.Element | JSX.Element[];
  border: boolean;
  backgroundColor: string;
};

function Card({ children, border, backgroundColor }: Props): JSX.Element {
  return (
    <View
      style={[
        S.container,
        { backgroundColor: backgroundColor || "#F0F0F0" }, // Default background color if not provided
        border && S.border,
      ]}
    >
      {children}
    </View>
  );
}

export default Card;
