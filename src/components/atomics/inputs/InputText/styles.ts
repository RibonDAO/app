import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {},
  input: {
    width: "100%",
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.green30,
    borderRadius: 8,
    height: 48,
  },
  inputDisabled: {
    width: "100%",
    marginBottom: 12,
    padding: 8,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.gray30,
    borderRadius: 8,
  },
});

export default styles;
