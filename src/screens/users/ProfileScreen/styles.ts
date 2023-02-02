import { StyleSheet } from "react-native";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  title: {
    ...stylizedDisplayMd,
    marginVertical: 20,
    paddingHorizontal: 20,
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 36,
  },
  container: {
    backgroundColor: theme.colors.neutral10,
    minHeight: "100%",
    marginTop: theme.spacingNative(24),
  },
});

export default styles;
