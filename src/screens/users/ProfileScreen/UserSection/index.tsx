import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function UserSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>15</Text>
      <Text style={styles.subtitle}>Total Badges</Text>
    </View>
  );
}

export default UserSection;
