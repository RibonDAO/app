import { Dimensions, Platform, StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(48),
  },
  imageContainer: {
    marginTop: theme.spacingNative(24),
    marginBottom: theme.spacingNative(24),
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
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
    marginBottom: theme.spacingNative(24),
  },
  button: {
    height: 48,
    backgroundColor: theme.colors.brand.primary[600],
    borderColor: theme.colors.brand.primary[800],
  },
  buttonDisabled: {
    height: 48,
    backgroundColor: theme.colors.neutral[200],
    borderColor: theme.colors.neutral[300],
  },
  inputContainer: {
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    ...defaultBodyMdRegular,
    height: "100%",
    lineHeight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
});

export default styles;
