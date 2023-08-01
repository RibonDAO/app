import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacingNative(16),
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: -theme.spacingNative(16),
    marginTop: -theme.spacingNative(16),
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(8),
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
  changeCurrencyButton: {
    marginTop: theme.spacingNative(8),
    paddingHorizontal: theme.spacingNative(16),
    paddingVertical: theme.spacingNative(4),
    borderColor: theme.colors.brand.primary[600],
    borderWidth: 1,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  changeCurrencyButtonText: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[600],
    marginLeft: theme.spacingNative(8),
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacingNative(4),
  },
});

export default styles;
