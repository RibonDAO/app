import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
  },
  container: {
    height: "100%",
    padding: theme.spacingNative(16),
    backgroundColor: theme.colors.brand.tertiary[50],
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
  donateButtonContainer: {
    marginTop: theme.spacingNative(24),
    backgroundColor: theme.colors.neutral10,
    padding: theme.spacingNative(16),
    marginHorizontal: -theme.spacingNative(16),
  },
  innerContainer: {},
  donateButton: {
    height: 48,
  },
  title: {
    ...stylizedDisplayMd,
    color: theme.colors.neutral[800],
    textAlign: "center",
  },
  subtitle: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[700],
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacingNative(24),
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacingNative(16),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap-reverse",
    width: "100%",
    gap: 18,
    marginBottom: theme.spacingNative(24),
  },
  arrow: {
    padding: theme.spacingNative(16),
    alignSelf: "flex-start",
  },
});

export default styles;
