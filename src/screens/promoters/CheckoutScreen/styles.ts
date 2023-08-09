import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
  },
  container: {
    height: "100%",
    padding: theme.spacingNative(16),
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
});

export default styles;
