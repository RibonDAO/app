import { StyleSheet } from "react-native";
import { stylizedDisplayMd } from "styles/typography/stylized";
import {
  defaultBodyLgBold,
  defaultBodyMdMedium,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    color: theme.colors.brand.primary[300],
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacingNative(20),
  },

  title: {
    ...stylizedDisplayMd,
    color: theme.colors.brand.primary[800],
    marginTop: theme.spacingNative(40),
  },
  description: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(12),
  },
  highlightedDescription: {
    ...defaultBodyLgBold,
    color: theme.colors.brand.primary[800],
    marginTop: theme.spacingNative(8),
    marginBottom: theme.spacingNative(32),
    textAlign: "center",
  },
});

export default styles;
