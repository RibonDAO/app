import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmMedium,
  defaultBodyXsRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    width: "100%",
    padding: theme.spacingNative(8),
    borderWidth: 1,
    borderColor: theme.colors.neutral[400],
    borderRadius: 4,
    height: 48,
    color: theme.colors.neutral[900],
  },
  iconInput: {
    position: "absolute",
    right: 0,
    padding: theme.spacingNative(12),
  },
  rightIcon: {
    position: "absolute",
    right: 0,
    padding: theme.spacingNative(12),
  },
  leftIcon: {
    position: "absolute",
    left: 0,
    padding: theme.spacingNative(12),
  },
  labelIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  required: {
    color: theme.colors.feedback.error[600],
  },
  input: {
    paddingLeft: theme.spacingNative(32),
  },
  inputActive: {
    borderColor: theme.colors.neutral[600],
    borderWidth: 2,
  },
  inputSuccess: {
    borderColor: theme.colors.brand.primary[600],
  },
  inputError: {
    borderColor: theme.colors.feedback.error[600],
  },
  inputDisabled: {
    borderColor: theme.colors.neutral[500],
    backgroundColor: "#F1F1EF",
    color: theme.colors.neutral[400],
  },
  label: {
    ...defaultBodySmMedium,
    marginBottom: theme.spacingNative(4),
    color: theme.colors.neutral[700],
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  labelDisabled: {},
  iconError: {
    marginRight: theme.spacingNative(4),
  },
  feedback: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacingNative(4),
  },
  helper: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[600],
  },

  errorMessage: {
    ...defaultBodyXsRegular,
    color: theme.colors.feedback.error[600],
  },
});

export default styles;
