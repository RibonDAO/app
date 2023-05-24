import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacingNative(8),
    alignItems: "center",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    ...defaultBodySmMedium,
  },
  radioCircle: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.neutral[500],
    width: 20,
    height: 20,
    marginRight: theme.spacingNative(8),
  },
  active: {
    borderWidth: 6,
    borderColor: theme.colors.brand.primary[600],
  },
  inactive: {},
  icon: {
    height: "100%",
    resizeMode: "contain",
  },
});

export default styles;
