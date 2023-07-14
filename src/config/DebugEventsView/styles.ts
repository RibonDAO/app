import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 105,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderColor: "#000",
    borderWidth: 1,
    zIndex: 99,
    width: "100%",
    height: 130,
    overflow: "scroll",
  },
  minimizeButton: {
    position: "absolute",
    top: 0,
    right: 60,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    zIndex: 99,
  },
  minimizedContainer: {
    position: "absolute",
    bottom: 105,
    left: 10,
    padding: 10,
    zIndex: 99,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  minimizedText: {
    marginRight: 5,
  },
  minusButton: {
    fontSize: 20,
  },
});

export default styles;
