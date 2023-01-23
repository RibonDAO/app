import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    margin: 0
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    marginBottom: 20,
  },
});

export default styles;
