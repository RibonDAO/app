import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared";

const styles = StyleSheet.create({
  configItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 53,
    borderColor: theme.colors.gray20,
    borderBottomWidth: 2
  },
  text: {
    paddingLeft: 8,
  },
  iconContainer: {
    width: "10%"
  },
  textContainer: {
    width: "60%"
  },
  ctaContainer: {
    width: "30%",
    paddingRight: 8
  },
  configContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default styles;
