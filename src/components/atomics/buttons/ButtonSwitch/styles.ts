import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boxIcon: {
    display: "flex",
    alignItems: "center",
    width: 20,
  },
  containerSwitch: {
    marginHorizontal: 4,
  },
  text: {
    color: theme.colors.brand.primary[600],
  },
});

export default styles;
