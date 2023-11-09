import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
  defaultBodyXsSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacingNative(12),
  },
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
  recurrenceContainer: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacingNative(16),
    alignItems: "center",
  },
  recurrenceTitle: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[900],
    marginHorizontal: theme.spacingNative(8),
  },
  donateButton: {
    ...defaultBodyXsSemibold,
    height: 28,
    width: "auto",
    display: "flex",
    alignItems: "center",
    gap: theme.spacingNative(4),
    paddingHorizontal: theme.spacingNative(8),
    borderRadius: theme.spacingNative(4),
    color: theme.colors.brand.primary[600],
    borderColor: theme.colors.brand.primary[600],
  },
});

export default styles;
