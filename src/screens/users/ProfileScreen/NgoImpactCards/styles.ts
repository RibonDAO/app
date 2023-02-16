import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: theme.spacingNative(20),
    paddingHorizontal: theme.spacingNative(16)
  },
  ngosListContainer: {
    paddingTop: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(24),
  },
});

export default styles;
