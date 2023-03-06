import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { RootStackScreenProps } from "types";
import ForYouScreenPlaceholder from "./placeholder";
import styles from "./styles";

export default function ForYouScreen({
  navigation,
}: RootStackScreenProps<"ForYouScreen">) {
  return (
    <View style={styles.container}>
      <ForYouScreenPlaceholder />
    </View>
  );
}
