import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";

const styles = StyleSheet.create({
  indicatorContainer: {
    display: "flex",
    flexDirection: "row",
  },
  indicatorTouch: {
    flexDirection: "column",
    justifyContent: "center",
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 100,
    backgroundColor: theme.colors.neutral[300],
    marginHorizontal: 3,
  },
  buttonContainer: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...defaultBodySmSemibold,
    color: theme.colors.neutral[700],
  },
  buttonStart: {
    ...defaultBodySmSemibold,
    color: theme.colors.brand.primary[500],
  },
});

export default styles;
