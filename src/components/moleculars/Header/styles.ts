import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: theme.colors.neutral10,
    justifyContent: "space-between",
    padding: theme.spacingNative(16),
    paddingRight: theme.spacingNative(12),
  },
  logo: {
    height: 34,
    resizeMode: "contain",
  },
  divider: {
    marginHorizontal: 8,
    color: theme.colors.neutral[200],
  },
  insideContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
