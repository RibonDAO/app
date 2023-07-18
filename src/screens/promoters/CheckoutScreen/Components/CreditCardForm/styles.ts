import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
  },
  half: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
