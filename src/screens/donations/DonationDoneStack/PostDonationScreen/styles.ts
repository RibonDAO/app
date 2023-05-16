import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { stylizedDisplayMd } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginVertical: theme.spacingNative(20),
    padding: theme.spacingNative(16),
  },
  text: {
    ...stylizedDisplayMd,
    marginBottom: theme.spacingNative(24),
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 36,
  },
  imageContainer: {
    width: 96,
    height: 96,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    marginBottom: theme.spacingNative(24),
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 24,
    paddingBottom: theme.spacingNative(16),
  },
  button: {
    borderColor: theme.colors.brand.primary[600],
    borderRadius: 4,
    height: 48,
  },
});

export default styles;
