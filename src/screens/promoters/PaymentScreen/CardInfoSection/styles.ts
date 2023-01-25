import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    height: 256,
    marginTop: 18,
    borderWidth: 1,
  },
  title: {
    marginBottom: 20,
    color: theme.colors.gray40,
  },
  half: {
    display: "flex",
  },
});

export default styles;
