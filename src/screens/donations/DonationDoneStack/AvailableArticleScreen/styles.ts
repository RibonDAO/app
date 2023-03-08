import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdSemibold,
  defaultBodyXsBold,
  defaultBodyXsRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topRow: {
    width: "100%",
    height: "auto",
    backgroundColor: theme.colors.neutral10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 375,
  },
  bottomRow: {
    width: "100%",
    height: "auto",
    backgroundColor: theme.colors.brand.primary[50],
    paddingHorizontal: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(16),
    paddingTop: theme.spacingNative(24),
  },
  articleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: theme.spacingNative(24),
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 128,
    borderRadius: 4,
    position: "relative",
    overflowX: "hidden",
    shadowColor: theme.colors.neutral[800],
    backgroundColor: theme.colors.neutral10,
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  articleImage: {
    width: 128,
    height: 128,
    objectFit: "cover",
    borderRadius: 4,
  },
  articleContent: {
    height: 128,
    flexDirection: "column",
    flexShrink: 1,
    paddingHorizontal: theme.spacingNative(8),
  },
  textSecondary: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacingNative(4),
  },
  textPrimary: {
    ...defaultBodyXsBold,
    color: theme.colors.brand.primary[800],
    marginBottom: theme.spacingNative(4),
  },
  textMedium: {
    ...defaultBodyMdSemibold,
  },
  buttonPrimary: {
    width: "100%",
    height: 48,
    marginBottom: theme.spacingNative(8),
    borderColor: "transparent",
    backgroundColor: theme.colors.brand.primary[600],
  },
  buttonSecondary: {
    width: "100%",
    height: 48,
    borderColor: theme.colors.brand.primary[600],
  },
});

export default styles;
