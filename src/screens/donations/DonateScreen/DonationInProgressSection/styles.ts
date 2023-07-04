import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  animationContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  nonProfitLogo: {
    width: 100,
    height: 100,
  },
});

export default styles;
