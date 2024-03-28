import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  articlesContainer: {
    paddingBottom: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(16),
  },
  articleDivider: {
    marginVertical: theme.spacingNative(24),
    height: 1,
    backgroundColor: theme.colors.neutral[100],
  },
  paddingContainer: {
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
  },
});

export default styles;
