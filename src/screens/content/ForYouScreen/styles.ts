import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
// import {
//   defaultBodyLgBold,
//   defaultBodySmRegular,
// } from "styles/typography/default";
// import { stylizedDisplaySm } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // padding: theme.spacingNative(20),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: theme.spacingNative(16),
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default styles;
