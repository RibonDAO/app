import { theme } from "@ribon.io/shared/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardsContainer: {
    height: "100%",
    marginBottom: theme.spacingNative(40),
    marginTop: theme.spacingNative(20),
  },
  zeroDonationsSection: {
    height: "100%",
    alignItems: "center",
    marginTop: theme.spacingNative(20),
    paddingHorizontal: theme.spacingNative(20),
  },
  zeroDonationsTitle: {
    marginVertical: theme.spacingNative(16),
  },
  zeroDonationsDescription: {
    marginBottom: theme.spacingNative(16),
    color: theme.colors.gray30,
    textAlign: "center",
  },
});

export default styles;
