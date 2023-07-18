import React from "react";
import { View, Text } from "react-native";
import S from "./styles";

export type Props = {
  label?: string;
  color?: string;
  data: string | JSX.Element | JSX.Element[];
};

function Data({ data, label, color }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <Text style={[S.data, { color }]}>{data}</Text>
      {label && <Text style={S.label}>{label}</Text>}
    </View>
  );
}

export default Data;
