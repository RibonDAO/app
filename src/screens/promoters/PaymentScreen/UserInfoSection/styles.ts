import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    height: 256,
  },
  title: {
    marginBottom: 18,
    color: theme.colors.gray40,
  },
  halfInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  countryInput: {},
});

export default styles;
