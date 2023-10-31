import { theme } from "@ribon.io/shared";
import { Dimensions, StyleSheet } from "react-native";
import {
  defaultBodyXsBold,
  defaultBodyMdRegular,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginVertical: theme.spacingNative(24),
  },
  imageContainer: {
    position: "relative",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.brand.primary[500],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonInner: {
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 12,
    borderLeftWidth: 24,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: theme.colors.neutral10,
    marginLeft: theme.spacingNative(4),
  },
  image: {
    width: Dimensions.get("window").width,
    height: 192,
    marginHorizontal: -theme.spacingNative(16),
  },
  textContainer: {
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacingNative(16),
    paddingTop: theme.spacingNative(24),
    paddingBottom: theme.spacingNative(24),
    backgroundColor: theme.colors.brand.primary[50],
    marginHorizontal: -theme.spacingNative(16),
  },
  headline: {
    ...defaultBodyXsBold,
    color: theme.colors.brand.primary[500],
    textTransform: "uppercase",
    marginBottom: theme.spacingNative(8),
  },
  title: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.primary[800],
    marginBottom: theme.spacingNative(4),
  },
  description: {
    ...defaultBodyMdRegular,
    marginTop: theme.spacingNative(4),
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
