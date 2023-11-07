import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
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
});

export default styles;
