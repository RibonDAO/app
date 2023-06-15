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
});

export default styles;
