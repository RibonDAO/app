import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import {
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacingNative(12),
  },
  impactCardContainer: {
    borderRadius: 8,
    padding: theme.spacingNative(16),
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
    color: theme.colors.brand.primary[800],
  },
  description: {
    ...defaultBodySmRegular,
    marginTop: theme.spacingNative(4),
    color: theme.colors.neutral[500],
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  contentSection: {
    width: "100%",
    justifyContent: "center",
  },
});

export default styles;
