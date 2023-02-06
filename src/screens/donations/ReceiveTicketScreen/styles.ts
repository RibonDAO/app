import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacingNative(16),
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.neutral10,
  },
  icon: {
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  title: {
    marginTop: theme.spacingNative(32),
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
  },
});

export default styles;
