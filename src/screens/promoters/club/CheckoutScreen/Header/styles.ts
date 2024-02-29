import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacingNative(16),
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: -theme.spacingNative(16),
    marginTop: -theme.spacingNative(16),
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(8),
  },
  title: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[600],
  },
  payableName: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[600],
  },
  container: {
    marginVertical: theme.spacingNative(8),
  },
  offer: {
    display: "flex",
    flexDirection: "row",
  },
  offerPrice: {
    ...stylizedDisplayMd,
    color: theme.colors.brand.primary[800],
    marginRight: theme.spacingNative(8),
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacingNative(4),
  },
});

export default styles;
