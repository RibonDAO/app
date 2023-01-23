import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared";

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  tabBarLabel: {
    fontSize: 14,
  },
});

export default styles;
