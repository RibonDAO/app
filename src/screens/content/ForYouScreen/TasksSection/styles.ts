import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyLgBold } from "styles/typography/default";

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
  timerWrapper: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.brand.primary[50],
    borderRadius: 5,
    textAlign: "center",
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
