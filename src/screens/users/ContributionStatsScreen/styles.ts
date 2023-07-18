import { StyleSheet } from "react-native";
import { stylizedDisplayLg } from "styles/typography/stylized";

export default StyleSheet.create({
  container: {
    marginBottom: 64,
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
    margin: "32px -16px",
    backgroundColor: "#F0F0F0",
  },
});
