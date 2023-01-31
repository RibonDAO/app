import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    height: 256,
  },
  title: {
    marginBottom: 18,
    color: theme.colors.gray40,
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
    paddingLeft: 4,
  },
  countryInputTheme: {
    fontFamily: "Inter",
    fontSize: 14,
  },
});

export default styles;
