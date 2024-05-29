import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacingNative(16),
    gap: theme.spacingNative(24),
    padding: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
  },
});

export default styles;
