import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: theme.colors.gray10,
    justifyContent: "space-between",
    padding: 16,
    paddingRight: 12
  },
  logo: {
    height: 34,
    resizeMode: "contain",
  },
  divider: {
    marginHorizontal: 8,
    color: theme.colors.gray20,
  },
  insideContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
