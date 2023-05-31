import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdRegular,
  defaultHeadingXxs,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    minWidth: 360,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: theme.spacingNative(24),
    backgroundColor: theme.colors.neutral10,
    borderRadius: 4,
  },
  title: {
    ...defaultHeadingXxs,
    marginTop: theme.spacingNative(16),
  },
  description: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[600],
    marginTop: theme.spacingNative(4),
    marginBottom: theme.spacingNative(16),
  },
  closeIcon: {
    display: "flex",
    alignSelf: "flex-end",
    marginBottom: theme.spacingNative(16),
  },
  button: {
    marginBottom: theme.spacingNative(8),
    height: 48,
  },
});

export default styles;
