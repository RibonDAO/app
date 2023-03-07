import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  articlesContainer: {
    paddingBottom: theme.spacingNative(16),
  },
  title: {
    ...stylizedDisplaySm,
    color: theme.colors.neutral[800],
    width: "100%",
    marginBottom: theme.spacingNative(16),
  },
  articleDivider: {
    marginVertical: theme.spacingNative(24),
    height: 1,
    backgroundColor: theme.colors.neutral[200],
  },
  paddingContainer: {
    paddingHorizontal: theme.spacingNative(16),
  },
});

export default styles;
