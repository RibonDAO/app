import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgBold,
  defaultBodySmBold,
  defaultBodySmMedium,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacingNative(16),
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: theme.spacingNative(16),
  },
  title: {
    ...defaultBodyLgBold,
    color: theme.colors.brand.primary[900],
    marginLeft: theme.spacingNative(4),
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
});

export default styles;
