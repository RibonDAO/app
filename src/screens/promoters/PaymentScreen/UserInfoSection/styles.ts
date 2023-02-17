import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacingNative(16),
  },
  title: {
    marginBottom: theme.spacingNative(20),
    color: theme.colors.neutral[800],
  },
  halfInputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  countryInputContainer: {
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    paddingLeft: theme.spacingNative(4),
  },
  countryInputTheme: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: theme.spacingNative(4),
    height: 48,
    borderRadius: 8,
    paddingLeft: 8,
  },
  dropdownText: {
    textAlign: "left",
  },
});

export default styles;
