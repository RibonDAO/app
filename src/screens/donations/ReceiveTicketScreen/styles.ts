import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacingNative(16),
    width: "100%",
    backgroundColor: theme.colors.neutral10,
  },
  icon: {
    borderRadius: 50,
    backgroundColor: "transparent",
    marginTop: -52,
  },
  title: {
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(8),
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    marginBottom: theme.spacingNative(20),
    color: theme.colors.gray30,
  },
  button: {
    height: 48,
  },
});

export default styles;
