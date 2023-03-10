import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {},
  input: {
    width: "100%",
    marginBottom: theme.spacingNative(12),
    padding: theme.spacingNative(8),
    borderWidth: 1,
    borderColor: theme.colors.brand.primary[300],
    borderRadius: 8,
    height: 48,
  },
  inputDisabled: {
    width: "100%",
    marginBottom: theme.spacingNative(12),
    padding: theme.spacingNative(8),
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.neutral[500],
    borderRadius: 8,
  },
});

export default styles;
