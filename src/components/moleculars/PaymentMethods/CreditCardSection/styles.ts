import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
  },
  half: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 48,
  },
  countryInputContainer: {
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    paddingLeft: theme.spacingNative(4),
    marginBottom: theme.spacingNative(16),
  },
  countryInputTheme: {
    fontFamily: "Inter400",
    fontSize: 14,
  },
  labelIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    ...defaultBodySmMedium,
    marginBottom: theme.spacingNative(4),
    color: theme.colors.neutral[700],
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
