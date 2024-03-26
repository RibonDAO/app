import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacingNative(8),
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: -theme.spacingNative(16),
    marginTop: -theme.spacingNative(8),
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(8),
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacingNative(4),
  },
});

export default styles;
