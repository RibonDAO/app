import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardsContainer: {
    height: "100%",
    marginBottom: theme.spacingNative(80),
    marginTop: theme.spacingNative(20),
  },
  ngosListContainer: {
    padding: 16,
    marginBottom: 24
  }
});

export default styles;
