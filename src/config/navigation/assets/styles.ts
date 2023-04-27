import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  redBall: {
    top: 0,
    width: 8,
    height: 8,
    position: "absolute",
    right: 0,
    backgroundColor: theme.colors.feedback.error[500],
    borderRadius: 100,
  },
});

export default styles;
