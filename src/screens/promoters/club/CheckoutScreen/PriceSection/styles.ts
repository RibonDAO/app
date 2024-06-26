import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

const styles = StyleSheet.create({
  offer: {
    display: "flex",
    flexDirection: "row",
  },
  offerPrice: {
    ...stylizedDisplayMd,
    color: theme.colors.brand.primary[800],
    marginRight: theme.spacingNative(8),
    marginBottom: theme.spacingNative(12),
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacingNative(8),
  },
  title: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[600],
  },
  receiver: {
    ...defaultBodySmSemibold,
    color: theme.colors.brand.primary[600],
  },
});

export default styles;
