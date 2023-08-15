import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  title: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[600],
  },
  payableName: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[600],
  },
  accordionTitle: {
    ...defaultBodyMdSemibold,
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(8),
  },
  outerContainer: {
    height: "100%",
  },
  container: {
    height: "100%",
    padding: theme.spacingNative(16),
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
  pageTitle: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[600],
    marginBottom: theme.spacingNative(12),
  },
});

export default styles;
