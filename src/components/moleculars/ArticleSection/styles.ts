import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdRegular,
  defaultBodySmBold,
  defaultBodySmMedium,
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[800],
    width: "100%",
    marginVertical: theme.spacingNative(12),
  },
  imageContainer: {
    width: "100%",
    height: 216,
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacingNative(4),
    borderColor: theme.colors.neutral[100],
    borderWidth: 1,
    backgroundColor: theme.colors.neutral[200],
  },
  image: {
    width: "100%",
    flexGrow: 1,
    resizeMode: "cover",
  },
  imageFooter: {
    width: "100%",
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: theme.colors.brand.secondary[100],
  },
  imageFooterText: {
    ...defaultBodySmMedium,
    color: theme.colors.brand.secondary[900],
  },
  greenText: {
    ...defaultBodySmBold,
    marginLeft: theme.spacingNative(8),
    color: theme.colors.brand.primary[800],
  },
  orangeText: {
    ...defaultBodySmBold,
    marginLeft: theme.spacingNative(8),
    color: theme.colors.brand.secondary[800],
  },
  textSecondary: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[500],
  },
  textDivider: {
    marginHorizontal: theme.spacingNative(8),
  },
});

export default styles;
