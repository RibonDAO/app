import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: theme.spacingNative(16),
  },
  text: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[600],
    marginRight: theme.spacingNative(4),
  },
  image: {
    marginLeft: theme.spacingNative(4),
  },
});

export default styles;
