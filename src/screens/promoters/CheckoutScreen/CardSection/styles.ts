import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  title: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[600],
  },
  payableName: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[600],
  },
  accordionTitle: {
    ...defaultBodyMdSemibold,
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(8),
  },
  button: {
    marginTop: theme.spacingNative(16),
    height: 48,
  },
});

export default styles;
