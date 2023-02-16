import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  configItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 53,
    borderColor: theme.colors.gray20,
    borderBottomWidth: 2,
  },
  text: {
    paddingLeft: theme.spacingNative(8),
  },
  iconContainer: {
    width: "10%",
  },
  textContainer: {
    width: "60%",
  },
  ctaContainer: {
    width: "30%",
    paddingRight: theme.spacingNative(8),
    alignItems: "flex-end"
  },
  configContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
