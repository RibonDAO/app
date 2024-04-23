import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacingNative(8),
  },
  title: {
    ...defaultBodyLgSemibold,
    color: theme.colors.neutral[800],
  },
  image: {
    width: "110%",
    height: 192,
    marginLeft: -16,
  },
  subtitle: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.primary[600],
  },
  description: {
    ...defaultBodySmRegular,
    marginTop: theme.spacingNative(4),
  },
  nonProfitTitle: {
    ...defaultBodyLgSemibold,
    color: theme.colors.neutral[800],
  },
});

export default styles;
