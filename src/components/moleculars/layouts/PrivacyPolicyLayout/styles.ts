import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  privacyPolicyText: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[600],
    textAlign: "center",
    marginTop: theme.spacingNative(16),
  },
  privacyPolicyLink: {
    color: theme.colors.brand.primary[600],
  },
});

export default styles;
