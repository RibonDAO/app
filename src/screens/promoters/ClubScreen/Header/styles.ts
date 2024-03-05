import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacingNative(12),
  },
  tag: {
    backgroundColor: theme.colors.brand.tertiary[25],
    color: theme.colors.brand.tertiary[800],
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.brand.tertiary[25],
    paddingLeft: theme.spacingNative(4),
    alignSelf: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: theme.spacingNative(16),
  },
  text: {
    color: theme.colors.brand.tertiary[800],
  },
  sparkles: {
    position: "absolute",
    top: 24,
  },
});

export default styles;
