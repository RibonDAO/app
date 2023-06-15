import { theme } from "@ribon.io/shared/styles";
import { Dimensions, StyleSheet } from "react-native";
import { defaultBodyMdBold } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(16),
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    backgroundColor: theme.colors.neutral10,
  },

  topBackground: {
    flex: 1,
    height: 116,
    resizeMode: "cover",
    justifyContent: "center",
  },
  description: {
    ...defaultBodyMdBold,
    bottom: 0,
    marginTop: theme.spacingNative(32),
    color: theme.colors.brand.primary[800],
    textAlign: "center",
    top: "25%",
  },
  animationContainer: {},
});

export default styles;
