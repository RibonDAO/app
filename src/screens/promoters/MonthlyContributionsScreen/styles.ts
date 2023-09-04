import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  stylizedDisplayLg,
  stylizedDisplaySm,
} from "styles/typography/stylized";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: theme.spacingNative(16),
    display: "flex",
    flexDirection: "column",
  },
  subscriptionsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacingNative(16),
    marginBottom: theme.spacingNative(16),
    width: "100%",
    color: theme.colors.neutral[600],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.neutral[100],
  },
  title: {
    ...stylizedDisplayLg,
    marginBottom: theme.spacingNative(24),
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    ...stylizedDisplaySm,
    color: theme.colors.brand.primary[800],
  },
  icon: {},
  text: {
    ...defaultBodySmMedium,
  },
  highlightedText: {
    ...defaultBodySmSemibold,
    color: theme.colors.brand.primary[600],
  },
  iconContainer: {
    backgroundColor: theme.colors.feedback.error[600],
    borderRadius: 4,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  arrow: {
    alignSelf: "flex-start",
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
