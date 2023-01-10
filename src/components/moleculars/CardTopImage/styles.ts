import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 160,
    padding: 16,
    backgroundColor: theme.colors.neutral10,
    borderRadius: 16,
    marginBottom: 16,
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: 50,
  },
  text: {
    marginTop: 16,
    fontSize: 14,
    color: theme.colors.gray40,
  },
});

export default styles;
