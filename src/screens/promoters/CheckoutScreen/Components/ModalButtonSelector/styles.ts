import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: theme.spacingNative(16),
    height: "100%",
  },
  button: {
    width: "49%",
    height: 48,
    marginBottom: theme.spacingNative(8),
    padding: theme.spacingNative(8),
  },
});

export default styles;
