import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacingNative(16),
    alignSelf: "center",
  },

  textContainer: {
    marginTop: theme.spacingNative(24),
    marginBottom: theme.spacingNative(8),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    ...stylizedDisplayXs,

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
