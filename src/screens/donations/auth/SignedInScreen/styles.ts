import { StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdSemibold } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(48),
  },
  imageContainer: {
    marginTop: theme.spacingNative(24),
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: theme.spacingNative(24),
    alignItems: "center",
  },
  mainImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },

  title: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.primary[900],
    marginBottom: theme.spacingNative(8),
  },
  description: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacingNative(24),
  },
  button: {
    height: 48,
  },
});

export default styles;
