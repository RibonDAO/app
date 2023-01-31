import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    zIndex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.orange40,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "bold",
    color: theme.colors.orange40,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    width: "60%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 8,
  },
  overlay: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 32,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray10,
  },
});

export default styles;
