import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacingNative(8),
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  tabBarLabel: {
    ...defaultBodyXsRegular,
  },
  logo: {
    height: 24,
    resizeMode: "contain",
  },
});

export default styles;
