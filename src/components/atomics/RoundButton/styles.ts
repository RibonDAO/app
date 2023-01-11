import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral10,
    height: 30,
    borderRadius: 20,
    borderColor: theme.colors.red30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.red30,
  },
});

export default styles;
