import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  resetButton: {
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 99,
  },
  eventLogsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  eventLogItem: {
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
    width: "100%",
  },
  eventName: {
    fontWeight: "800",
  },
});

export default styles;
