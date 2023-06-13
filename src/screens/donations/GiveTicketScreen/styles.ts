import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  subtitle: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[500],
  },
});

export default styles;
