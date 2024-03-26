import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  donateButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    backgroundColor: theme.colors.neutral10,
    padding: theme.spacingNative(16),
  },
  innerContainer: {
    position: "relative",
    backgroundColor: theme.colors.brand.tertiary[50],
    width: "100%",
  },

  donateButton: {
    height: 48,
  },
  title: {
    ...stylizedDisplayMd,
    color: theme.colors.neutral[800],
    textAlign: "center",
    margin: theme.spacingNative(16),
    marginBottom: theme.spacingNative(40),
  },
  subtitle: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[700],
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(8),
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacingNative(24),
    marginBottom: theme.spacingNative(98),
    width: "100%",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacingNative(16),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap-reverse",
    gap: 18,
    marginBottom: theme.spacingNative(24),
  },
  arrow: {
    padding: theme.spacingNative(16),
    alignSelf: "flex-start",
  },
  supportBanner: {
    marginBottom: 124,
    width: 328,
  },
});

export default styles;
