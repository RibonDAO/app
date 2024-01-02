import { Dimensions, Platform, StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
  },
  imageContainer: {
    marginTop: theme.spacingNative(24),
    paddingHorizontal: theme.spacingNative(64),
    paddingVertical: theme.spacingNative(48),
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: theme.spacingNative(24),
    alignItems: "center",
    gap: theme.spacingNative(8),
  },
  imageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  button: {
    height: 48,
  },
  privacyPolicyText: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[600],
    textAlign: "center",
    marginTop: theme.spacingNative(16),
  },
  privacyPolicyLink: {
    color: theme.colors.brand.primary[600],
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
  description: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
