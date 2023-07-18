import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export type Props = {
  label?: string;
  color?: string;
  data: string | JSX.Element | JSX.Element[];
};

function Data({ data, label, color }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={[styles.data, { color }]}>{data}</Text>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

export default Data;
