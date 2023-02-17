import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.brand.primary[300],
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutral10,
  },
});

export default styles;
