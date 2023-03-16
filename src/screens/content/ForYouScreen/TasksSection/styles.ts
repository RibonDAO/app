import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacingNative(16),
  },
  paddingContainer: {
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
  },
});

export default styles;
