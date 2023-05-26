import { StyleSheet } from "react-native";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral10,
    minHeight: "100%",
  },
  title: {
    ...stylizedDisplaySm,
    marginBottom: theme.spacingNative(16),
  },
  cardsSection: {
    paddingHorizontal: theme.spacingNative(16),
  },
});

export default styles;
