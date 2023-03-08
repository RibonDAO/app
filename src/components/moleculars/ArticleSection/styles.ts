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
    position: "relative",
    overflowX: "hidden",
    shadowColor: theme.colors.neutral[800],
    backgroundColor: theme.colors.neutral10,
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    flexGrow: 1,
    resizeMode: "cover",
    borderTopLeftRadius: theme.spacingNative(4),
    borderTopRightRadius: theme.spacingNative(4),
  },
  singleImage: {
    borderBottomLeftRadius: theme.spacingNative(4),
    borderBottomRightRadius: theme.spacingNative(4),
  },
  imageFooter: {
    width: "100%",
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: "#FFF1E5",
    borderBottomLeftRadius: theme.spacingNative(4),
    borderBottomRightRadius: theme.spacingNative(4),
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
