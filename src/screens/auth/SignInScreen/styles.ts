import { Dimensions, Platform, StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

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
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
});

export default styles;
