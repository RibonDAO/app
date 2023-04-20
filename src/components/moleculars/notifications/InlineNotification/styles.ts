import { StyleSheet } from "react-native";
import {
  defaultBodySmBold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: theme.spacingNative(16),
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    color: theme.colors.neutral[800],
    alignItems: "center",
    justifyContent: "space-between",
  },
  success: {
    borderColor: theme.colors.feedback.success[500],
    backgroundColor: theme.colors.feedback.success[50],
  },
  warning: {
    borderColor: theme.colors.feedback.warning[500],
    backgroundColor: theme.colors.feedback.warning[50],
  },
  error: {
    borderColor: theme.colors.feedback.error[500],
    backgroundColor: theme.colors.feedback.error[50],
  },
  informational: {
    borderColor: theme.colors.feedback.informational[400],
    backgroundColor: theme.colors.feedback.informational[50],
  },
  textContainer: {
    marginLeft: theme.spacingNative(16),
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rightContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  closeIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...defaultBodySmSemibold,
  },
  description: {
    ...defaultBodySmRegular,
  },
  links: {},
  link: {
    ...defaultBodySmBold,
    marginTop: theme.spacingNative(8),
    marginRight: theme.spacingNative(16),
    textDecorationLine: "underline",
  },
});

export default styles;
