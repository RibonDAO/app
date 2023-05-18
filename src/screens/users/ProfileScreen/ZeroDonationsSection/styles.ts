import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  cardsContainer: {
    height: "100%",
    marginBottom: theme.spacingNative(40),
    marginTop: theme.spacingNative(20),
  },
  zeroDonationsSection: {
    alignItems: "center",
    marginTop: theme.spacingNative(20),
    paddingHorizontal: theme.spacingNative(20),
    paddingBottom: theme.spacingNative(20),
  },
  zeroDonationsTitle: {
    ...defaultBodyMdBold,
    marginVertical: theme.spacingNative(16),
  },
  zeroDonationsDescription: {
    ...defaultBodyMdRegular,
    marginBottom: theme.spacingNative(16),
    color: theme.colors.neutral[500],
    textAlign: "center",
  },
});

export default styles;
