import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import {
  defaultBodyLgBold,
  defaultBodyXsRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: theme.spacingNative(12),
  },
  impactCardContainer: {
    display: "flex",
    flexDirection: "row",
    height: 140,
    borderRadius: 8,
    padding: theme.spacingNative(16),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 18,
  },
  impact: {
    ...defaultBodyLgBold,
    marginTop: theme.spacingNative(8),
    color: theme.colors.brand.primary[300],
  },
  description: {
    ...defaultBodyXsRegular,
    marginTop: theme.spacingNative(4),
    color: theme.colors.neutral[500],
    fontSize: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  contentSection: {
    width: "100%",
    height: "100%",
    marginLeft: theme.spacingNative(12),
    justifyContent: "center",
  },
});

export default styles;
