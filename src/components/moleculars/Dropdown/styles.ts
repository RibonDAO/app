import { StyleSheet } from "react-native";
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
    position: "absolute",
    marginTop: 4,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "60%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 8,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray10,
  },
});

export default styles;
