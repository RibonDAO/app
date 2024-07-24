import { Dimensions, Platform, StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdRegular,
  defaultBodyMdSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(48),
  },
  contentContainer: {
    marginTop: theme.spacingNative(24),
    alignItems: "center",
  },
  iconContainer: {
    marginTop: theme.spacingNative(24),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 128,
    height: 128,
    resizeMode: "cover",
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
    justifyContent: "center",
  },
});

export default styles;
