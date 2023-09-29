import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdBold } from "styles/typography/default";

const styles = StyleSheet.create({
  timerWrapper: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.brand.primary[50],
    borderRadius: 5,
    textAlign: "center",
    marginBottom: theme.spacingNative(16),
    display: "flex",
    alignItems: "center",
    paddingHorizontal: theme.spacingNative(16),
    flexDirection: "row",
  },
  countdown: {
    ...defaultBodyMdBold,
    color: theme.colors.brand.primary[900],
    marginRight: theme.spacingNative(4),
  },
});

export default styles;
