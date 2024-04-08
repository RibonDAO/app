import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: theme.colors.brand.primary[50],
    width: 140,
    height: 104,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...defaultBodySmSemibold,
  },
});

export default styles;
