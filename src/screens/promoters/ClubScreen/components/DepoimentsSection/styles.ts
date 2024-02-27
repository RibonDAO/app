import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayMd } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    ...stylizedDisplayMd,
    color: theme.colors.neutral[800],
    alignSelf: "center",
    marginBottom: theme.spacingNative(24),
  },
});

export default styles;
