import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacingNative(20),
  },
  title: {
    marginBottom: theme.spacingNative(20),
    color: theme.colors.neutral[800],
  },
  half: {
    display: "flex",
    flexDirection: "row",
  },
});

export default styles;
