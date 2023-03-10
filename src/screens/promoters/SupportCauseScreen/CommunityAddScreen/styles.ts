import { StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: theme.spacingNative(32),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
  },
  title: {
    ...stylizedDisplayXs,
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginTop: theme.spacingNative(24),
    resizeMode: "contain",
    height: 400,
  },
  donateButton: {
    marginTop: theme.spacingNative(24),
  },
});

export default styles;
