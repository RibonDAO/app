import { StyleSheet } from "react-native";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

export default StyleSheet.create({
  container: {
    paddingTop: theme.spacingNative(24),
    paddingBottom: theme.spacingNative(24),
    marginBottom: theme.spacingNative(64),
    paddingHorizontal: theme.spacingNative(16),
    position: "relative",
  },
  bannerContainer: {
    marginTop: theme.spacingNative(24),
  },
  title: {
    marginBottom: theme.spacingNative(24),
    color: theme.colors.neutral[800],
    ...stylizedDisplaySm,
  },
  titleHighlight: {
    fontSize: 24,
    color: theme.colors.brand.primary[600],
  },
  contentContainer: {
    flexDirection: "column",
  },
  containerItem: {},
  divider: {
    height: 8,
    marginVertical: 32,
    marginHorizontal: -16,
    backgroundColor: "#F0F0F0",
  },
});
