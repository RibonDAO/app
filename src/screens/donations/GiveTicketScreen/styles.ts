import { theme } from "@ribon.io/shared/styles";
import { Dimensions, StyleSheet } from "react-native";
import {
  defaultBodyMdSemibold,
  defaultHeadingLg,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacingNative(16),
    alignSelf: "center",
    maxHeight: "100%",
    minHeight: "80%",
  },

  textContainer: {
    marginTop: theme.spacingNative(24),
    marginBottom: theme.spacingNative(24),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    ...stylizedDisplayXs,
    marginTop: theme.spacingNative(20),
    color: theme.colors.brand.primary[800],
    textAlign: "center",
  },
  subtitle: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[500],
    marginTop: theme.spacingNative(8),
    textAlign: "center",
  },
  arrow: {
    padding: theme.spacingNative(16),
    alignSelf: "flex-start",
  },
  ticketExplanationSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacingNative(12),
  },
  ticketText: {
    color: theme.colors.neutral[500],
    marginLeft: theme.spacingNative(4),
    lineHeight: 22,
  },
  ticketTextContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
    margin: -2,
    marginBottom: 0,
  },

  integrationWrapper: {
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(16),
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    textAlign: "center",
    backgroundColor: theme.colors.neutral10,
  },
  description: {
    ...defaultBodyMdSemibold,
    marginBottom: theme.spacingNative(24),
    marginTop: theme.spacingNative(8),
    color: theme.colors.neutral[500],
    textAlign: "center",
  },
  leftImage: {
    position: "absolute",
    left: 0,
    top: 32,
    paddingLeft: theme.spacingNative(32),
  },
  rightImage: {
    position: "absolute",
    right: 0,
    bottom: 16,
    paddingRight: theme.spacingNative(32),
  },
  imageContainer: {
    width: "100%",
    marginLeft: theme.spacingNative(16),
    marginRight: theme.spacingNative(16),
    marginBottom: theme.spacingNative(24),
  },
  integrationContainer: {
    width: "100%",
    borderColor: theme.colors.neutral[200],
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: theme.spacingNative(24),
    zIndex: 3,
    backgroundColor: theme.colors.neutral10,
  },
  logoText: {
    ...defaultHeadingLg,
    color: theme.colors.brand.primary[200],
    paddingLeft: theme.spacingNative(20),
    paddingRight: theme.spacingNative(20),
  },
  integrationLogo: {
    width: 101,
  },
});

export default styles;
