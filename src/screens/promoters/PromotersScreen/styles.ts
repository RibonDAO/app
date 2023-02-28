import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    backgroundColor: "rgb(241,241,239)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.colors.neutral10,
    padding: 8,
  },
  collapsibleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
    height: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  firstButton: {
    flex: 1,
    height: 30,
    marginRight: 4,
  },
  buttonText: {
    fontSize: 12,
  },
  secondButton: {
    flex: 1,
    height: 30,
    marginLeft: 4,
  },
});

export default styles;
