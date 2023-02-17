import { StyleSheet } from "react-native";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  diamond: {
    width: 200,
    height: 200,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: theme.spacingNative(64),
    marginBottom: 60,
    transform: [{ rotate: "45deg" }],
  },
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
  cardImage: {
    width: "100%",
    height: "100%",
    transform: [{ rotate: "-45deg" }, { scale: 1.4 }],
  },
  title: {
    ...stylizedDisplayMd,
    color: theme.colors.brand.primary[300],
    marginTop: theme.spacingNative(10),
  },
  description: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(32),
  },
  highlightedDescription: {
    color: theme.colors.brand.primary[300],
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(32),
    textAlign: "center",
  },
});

export default styles;
