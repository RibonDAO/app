import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const { primary, tertiary } = theme.colors.brand;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral10,
    height: 30,
    borderRadius: 20,
    borderColor: tertiary[400],
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerGreen: {
    backgroundColor: theme.colors.neutral10,
    height: 30,
    borderRadius: 20,
    borderColor: primary[300],
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: tertiary[400],
  },
  textGreen: {
    fontSize: 14,
    fontWeight: "600",
    color: primary[300],
  },
});

export default styles;
