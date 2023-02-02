import { StyleSheet } from "react-native";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral10,
    minHeight: "100%",
  },
  title: {
    ...stylizedDisplayMd,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 36,
  },
});

export default styles;
