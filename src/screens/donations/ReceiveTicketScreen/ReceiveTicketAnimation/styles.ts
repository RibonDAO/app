import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  containerColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  diamond: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 86,
    height: 86,
    borderRadius: 10,
    position: "relative",
    zIndex: theme.zindex.above,
    overflow: "hidden",
    backgroundColor: theme.colors.green30,
    transform: [{ scale: 0.8 }, { rotate: "-45deg" }],
    transformOrigin: "center",
  },
  diamondImage: {
    backgroundColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  stripedLine: {
    borderStyle: "dotted",
    borderWidth: 3,
    borderRadius: 1,
    borderColor: theme.colors.gray20,
    width: 120,
    marginBottom: 0,
  },
  ticketRoundBox: {
    position: "absolute",
    left: 85,
    height: 42,
    width: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: theme.colors.green20,
  },
  text: {
    marginTop: 20,
    color: theme.colors.green30,
    fontWeight: "bold",
  },
});

export default styles;
