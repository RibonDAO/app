import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayLg } from "styles/typography/stylized";
import { defaultBodyMdRegular } from "styles/typography/default";

const getScaleBasedOnWidth = () => {
  const { width } = Dimensions.get("window");

  if (width > 800) {
    return 1.5;
  }

  return 1;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 2,
    padding: theme.spacingNative(20),
    maxWidth: 450,
  },
  title: {
    ...stylizedDisplayLg,
    color: theme.colors.brand.primary[800],
    marginTop: theme.spacingNative(32),
    textAlign: "center",
  },
  subtitle: {
    ...defaultBodyMdRegular,
    textAlign: "center",
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(12),
  },
  button: {
    marginTop: theme.spacingNative(32),
    backgroundColor: theme.colors.brand.primary[800],
    width: 320,
    height: 50,
    borderWidth: 0,
  },
  buttonText: {
    color: theme.colors.neutral10,
  },
  abstractFormContainer: {
    position: "absolute",
    top: -250,
    zIndex: 1,
    transform: [{ scale: getScaleBasedOnWidth() }],
  },
});

export default styles;
