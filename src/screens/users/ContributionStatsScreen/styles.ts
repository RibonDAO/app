import { StyleSheet } from "react-native";
import { stylizedDisplayLg } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

export default StyleSheet.create({
  container: {
    paddingTop: theme.spacingNative(24),
    marginBottom: theme.spacingNative(64),
    paddingHorizontal: theme.spacingNative(16),
    position: "relative",
  },
  title: {
    marginBottom: 32,
    color: "#333333",
    ...stylizedDisplayLg,
  },
  titleHighlight: {
    fontSize: 24,
    color: "#FF5F5F",
  },
  contentContainer: {
    flexDirection: "column",
  },
  containerItem: {},
  divider: {
    height: 8,
    marginVertical: 32,
    marginHorizontal: -16,
    backgroundColor: "#F0F0F0",
  },
});
