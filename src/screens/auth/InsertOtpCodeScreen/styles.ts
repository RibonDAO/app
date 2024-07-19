import { Dimensions, Platform, StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdRegular } from "styles/typography/default";

const min = (a: number, b: number) => (a < b ? a : b);

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
    marginBottom: theme.spacingNative(8),
    textAlign: "center",
  },
  button: {
    height: 48,
    backgroundColor: theme.colors.brand.primary[600],
    borderColor: theme.colors.brand.primary[800],
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
  codeFieldRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: min(Dimensions.get("window").width - 32, 700),
    marginBottom: theme.spacingNative(24),
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 46,
    fontSize: 24,
    borderWidth: 2,
    borderColor: theme.colors.neutral[300],
    textAlign: "center",
    borderRadius: 8,
  },
  focusCell: {
    borderColor: theme.colors.brand.primary[600],
  },
  subtitle: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[800],
    textAlign: "center",
    marginBottom: theme.spacingNative(24),
  },
  resendCodeLink: {
    ...defaultBodyMdRegular,
    color: theme.colors.brand.primary[600],
    textDecorationLine: "underline",
  },
  resendCodeContainer: {
    marginTop: theme.spacingNative(16),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacingNative(8),
  },
  resendCodeLinkDisabled: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[400],
    textDecorationLine: "underline",
  },
  timer: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[800],
  },
  timerDisabled: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[400],
  },
});

export default styles;
