import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: theme.zindex.loading,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerDiv: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginLeft: 8,
    color: theme.colors.gray40,
  },
});

export default styles;