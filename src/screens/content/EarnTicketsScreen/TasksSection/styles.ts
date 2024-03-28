import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmBold,
  defaultBodySmMedium,
  defaultBodyMdBold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacingNative(16),
  },
  paddingContainer: {
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
  },
  progressBar: {
    marginBottom: theme.spacingNative(16),
  },
  integrationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacingNative(24),
  },
  integrationLeftSection: {
    display: "flex",
    flexDirection: "row",
  },
  integrationRightSection: {
    display: "flex",
    flexDirection: "column",
  },
  integrationTitle: {
    ...defaultBodySmBold,
    color: theme.colors.neutral[900],
  },
  integrationIcon: {
    resizeMode: "contain",
    padding: theme.spacingNative(8),
  },
  integrationIconContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    marginRight: theme.spacingNative(12),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  integrationLink: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[600],
    textDecorationLine: "underline",
  },
  timerWrapper: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.brand.primary[50],
    borderRadius: 5,
    textAlign: "center",
    marginBottom: theme.spacingNative(16),
    display: "flex",
    alignItems: "center",
    paddingHorizontal: theme.spacingNative(16),
    flexDirection: "row",
  },
  countdown: {
    ...defaultBodyMdBold,
    color: theme.colors.brand.primary[900],
    marginRight: theme.spacingNative(4),
  },
});

export default styles;
