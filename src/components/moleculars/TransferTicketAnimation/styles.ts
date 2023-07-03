import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsMedium } from "styles/typography/default";

const { primary } = theme.colors.brand;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
  },
  containerColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: primary[300],
    transform: [{ scale: 0.8 }, { rotate: "-45deg" }],
    transformOrigin: "center",
  },
  diamondImage: {
    backgroundColor: "transparent",
    transform: [{ rotate: "45deg" }, { scale: 1.2 }],
  },
  stripedLine: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderRadius: 1,
    borderColor: theme.colors.neutral[200],
    width: Dimensions.get("window").width - 270,
    marginBottom: theme.spacingNative(0),
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
    backgroundColor: primary[200],
  },
  text: {
    marginTop: theme.spacingNative(20),
    color: primary[300],
    fontWeight: "bold",
  },
  diamondText: {
    ...defaultBodyXsMedium,
    paddingTop: theme.spacingNative(8),
    color: theme.colors.neutral[500],
    width: "50%",
    textAlign: "center",
  },
});

export default styles;
