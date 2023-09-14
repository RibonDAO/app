import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdRegular,
  defaultBodyXsBold,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    width: "110%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacingNative(16),
    backgroundColor: theme.colors.brand.primary[50],
    left: -16,
  },
  title: {
    ...defaultBodyXsBold,
    color: theme.colors.brand.primary[500],
    textTransform: "uppercase",
    marginBottom: theme.spacingNative(8),
  },
  subtitle: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.primary[800],
    marginBottom: theme.spacingNative(4),
  },
  text: {
    ...defaultBodyMdRegular,
    marginTop: theme.spacingNative(4),
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
