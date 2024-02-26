import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  supportContainer: {
    position: "absolute",
    right: -5,
    top: 50,
    width: 300,
    borderRadius: 16,
    borderColor: theme.colors.neutral[200],
    backgroundColor: theme.colors.neutral10,
    borderWidth: 1,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 12,
  },
});

export default styles;
