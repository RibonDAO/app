import { StyleSheet } from "react-native";
import {
  stylizedDisplaySm,
  stylizedDisplayXs,
} from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(24),
  },
  title: {
    ...stylizedDisplaySm,
    marginRight: theme.spacingNative(0),
    marginBottom: theme.spacingNative(16),
    marginLeft: theme.spacingNative(0),
    color: theme.colors.neutral[800],
  },
  contentContainer: {
    maxWidth: 472,
    marginTop: theme.spacingNative(16),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    position: "relative",
    shadowColor: theme.colors.neutral[800],
    backgroundColor: theme.colors.neutral10,
    elevation: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  supportImage: {
    height: 148,
    width: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  donateContainer: {
    paddingTop: theme.spacingNative(24),
    paddingRight: theme.spacingNative(24),
    paddingBottom: theme.spacingNative(24),
    paddingLeft: theme.spacingNative(24),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  givingContainer: {
    marginBottom: theme.spacingNative(24),
    paddingTop: theme.spacingNative(0),
    paddingRight: theme.spacingNative(32),
    paddingBottom: theme.spacingNative(0),
    paddingLeft: theme.spacingNative(32),
    alignItems: "center",
    justifyContent: "center",
  },
  contributionContainer: {},
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
    color: theme.colors.neutral[500],
  },
  communityAddValue: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.secondary[300],
  },
  userBalanceText: {
    ...defaultBodySmSemibold,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacingNative(4),
    textAlign: "center",
  },
  refundText: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(4),
    textAlign: "center",
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
