import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import { defaultBodyMdRegular } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: theme.spacingNative(16),
    marginTop: theme.spacingNative(24),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoItem: {
    marginRight: theme.spacingNative(16),
    marginLeft: theme.spacingNative(16),
  },
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: theme.spacingNative(24),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    ...stylizedDisplayXs,
    color: theme.colors.brand.primary[900],
    textAlign: "center",
  },
  subtitle: {
    ...defaultBodyMdRegular,
    marginTop: theme.spacingNative(12),
    color: theme.colors.neutral[600],
    textAlign: "center",
  },
});

export default styles;
