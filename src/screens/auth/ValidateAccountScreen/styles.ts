import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

export default StyleSheet.create({
  container: {
    paddingTop: theme.spacingNative(24),
    paddingBottom: theme.spacingNative(24),
    marginBottom: theme.spacingNative(64),
    paddingHorizontal: theme.spacingNative(16),
    position: "relative",
  },
});
