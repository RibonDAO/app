import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  text: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[25],
  },
  container: {
    backgroundColor: theme.colors.brand.primary[900],
    height: 28,
    minWidth: 50,
    borderRadius: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacingNative(4),
  },
});

export default styles;
