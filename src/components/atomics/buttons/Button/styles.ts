import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.brand.primary[900],
    width: "100%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutral10,
  },
  icon: {
    height: "100%",
    width: 50,
    resizeMode: "contain",
    marginLeft: theme.spacingNative(8),
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
