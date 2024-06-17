import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import { defaultBodySmRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  paragraph: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[900],
    maxWidth: "98%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: theme.colors.brand.primary[300],
    borderWidth: 2,
    marginRight: theme.spacingNative(8),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  navigationButton: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.brand.primary[50],
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 3,
  },
});

export default styles;
