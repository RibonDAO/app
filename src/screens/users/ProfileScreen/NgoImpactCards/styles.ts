import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardsContainer: {
    height: "100%",
    marginTop: theme.spacingNative(20),
  },
  ngosListContainer: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  }
});

export default styles;
