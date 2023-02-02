import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared";

const styles = StyleSheet.create({
  container: {
    height: 80,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: theme.colors.neutral10,
    justifyContent: "space-between",
    paddingTop: theme.spacingNative(16),
    paddingLeft: theme.spacingNative(16),
    paddingRight: theme.spacingNative(12),
  },
  logo: {
    height: 34,
    resizeMode: "contain",
  },
  divider: {
    marginHorizontal: 8,
    color: theme.colors.gray20,
  },
  insideContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
