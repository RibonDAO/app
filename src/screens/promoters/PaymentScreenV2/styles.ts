import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacingNative(16),
  },
  header: {
    marginBottom: theme.spacingNative(24),
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  title: {
    ...defaultBodyMdMedium,
    color: theme.colors.neutral[600],
  },
  payableName: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[600],
  },
  button: {
    marginTop: theme.spacingNative(16),
    height: 48,
  },
});

export default styles;
