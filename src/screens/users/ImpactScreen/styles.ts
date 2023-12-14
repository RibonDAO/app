import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral[100],
  },
  cardsSection: {
    paddingHorizontal: theme.spacingNative(16),
  },
});

export default styles;
