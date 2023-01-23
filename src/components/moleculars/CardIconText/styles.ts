import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    objectFit: "cover",
  },
  text: {
    color: theme.colors.gray40,
  },
  insideContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
