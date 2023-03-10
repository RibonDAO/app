import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayLg } from "styles/typography/stylized";
import { defaultBodyMdRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...stylizedDisplayLg,
    color: theme.colors.brand.primary[800],
    marginTop: theme.spacingNative(32),
    textAlign: "center",
  },
  description: {
    ...defaultBodyMdRegular,
    textAlign: "center",
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(12),
  },
});

export default styles;
