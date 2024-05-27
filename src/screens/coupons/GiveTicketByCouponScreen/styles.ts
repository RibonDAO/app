import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { defaultBodyMdSemibold } from "styles/typography/default";
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
    marginBottom: theme.spacingNative(12),
    color: theme.colors.brand.primary[800],
    textAlign: "center",
  },
  subtitle: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[500],
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
});

export default styles;
