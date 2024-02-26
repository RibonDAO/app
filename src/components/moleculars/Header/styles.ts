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
    height: 24,
    resizeMode: "contain",
    width: "33%",
    marginLeft: theme.spacingNative(12),
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    marginHorizontal: 8,
    color: theme.colors.neutral[200],
  },
  insideContainer: {
    display: "flex",
  },
});

export default styles;
