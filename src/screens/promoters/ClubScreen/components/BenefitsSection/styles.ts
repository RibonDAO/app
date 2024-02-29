import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdSemibold,
  defaultBodySmMedium,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: theme.spacingNative(16),
    paddingTop: theme.spacingNative(24),
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "flex-start",
    borderColor: theme.colors.brand.tertiary[25],
    backgroundColor: theme.colors.brand.tertiary[25],
    width: "100%",
    marginBottom: theme.spacingNative(40),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacingNative(24),
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacingNative(12),
    width: "80%",
  },
  title: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.tertiary[800],
    marginBottom: theme.spacingNative(4),
  },
  description: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[700],
  },

  circle: {
    position: "absolute",
    left: 0,
    top: "25%",
    bottom: 0,
    right: 0,
    resizeMode: "stretch",
    width: "110%",
    marginLeft: -theme.spacingNative(16),
    marginRight: -theme.spacingNative(16),
    zIndex: -1,
  },
});

export default styles;
