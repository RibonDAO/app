import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import {
  stylizedDisplaySm,
  stylizedDisplayXs,
} from "styles/typography/stylized";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(24),
    backgroundColor: theme.colors.neutral10,
  },
  contentContainer: {
    maxWidth: 472,
    marginTop: theme.spacingNative(16),
    borderRadius: 8,
    position: "relative",
    overflowX: "hidden",
    shadowColor: theme.colors.neutral[800],
    backgroundColor: theme.colors.neutral10,
    elevation: 2,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  donateContainer: {
    padding: theme.spacingNative(24),
    borderRadius: 8,
    shadowColor: theme.colors.defaultShadow10,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.32,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: theme.colors.neutral10,
  },
  givingContainer: {
    marginBottom: theme.spacingNative(24),
    padding: theme.spacingNative(0),
    paddingLeft: theme.spacingNative(32),
    paddingRight: theme.spacingNative(32),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contributionContainer: {
    maxWidth: "100%",
  },
  communityAddContainer: {
    marginTop: theme.spacingNative(24),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  communityAddText: {
    ...defaultBodyXsRegular,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.neutral[500],
  },
  communityAddValue: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.secondary[300],
  },
  communityAddButton: {
    marginTop: theme.spacingNative(8),
    padding: theme.spacingNative(4),
    borderColor: theme.colors.brand.secondary[700],
    fontSize: 11,
    color: theme.colors.brand.secondary[700],
  },
  donateButton: {
    borderColor: theme.colors.brand.secondary[300],
    fontWeight: "600",
    backgroundColor: theme.colors.brand.secondary[300],
    color: theme.colors.brand.secondary[700],
  },
  backgroundImage: {
    display: "none",
  },
  title: {
    ...stylizedDisplaySm,
    marginBottom: theme.spacingNative(16),
    color: theme.colors.neutral[800],
  },
  supportImage: {
    width: "100%",
    height: 148,
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  intersection: {
    position: "absolute",
    zIndex: 1,
    transform: [{ translateY: -100 }],
  },
  userBalanceText: {
    ...defaultBodySmSemibold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: theme.spacingNative(4),
    textAlign: "center",
    color: theme.colors.neutral[500],
  },
  userBalanceTextHighlight: {
    ...defaultBodySmSemibold,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.brand.secondary[400],
  },
  refundText: {
    ...defaultBodyXsRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: theme.spacingNative(4),
    textAlign: "center",
    color: theme.colors.neutral[500],
  },
  supportSection: {
    paddingBottom: 72,
  },
  arrow: {
    paddingVertical: theme.spacingNative(16),
    alignSelf: "flex-start",
  },
});

export default styles;
