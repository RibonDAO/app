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
  outerContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: theme.colors.brand.primary[300],
    width: 320,
    height: 50,
    borderWidth: 0,
  },
  buttonText: {
    color: theme.colors.brand.primary[800],
  },
});

export default styles;
