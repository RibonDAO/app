import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmBold,
  defaultBodySmMedium,
} from "styles/typography/default";

const styles = StyleSheet.create({
  toastContainer: {
    ...defaultBodySmMedium,
    display: "flex",
    flexDirection: "column",
    width: 328,
    borderRadius: 4,
    padding: theme.spacingNative(20),
    overflow: "hidden",
    color: theme.colors.neutral10,
    borderColor: theme.colors.neutral10,
    borderWidth: 1,
  },
  message: {
    width: 224,
    wordBreak: "break-word",
  },
  icon: {
    marginRight: theme.spacingNative(8),
  },
  link: {
    ...defaultBodySmBold,
    color: theme.colors.neutral10,
    textDecorationLine: "underline",
    marginLeft: theme.spacingNative(32),
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  closeIcon: {
    marginLeft: "auto",
  },
});

export default styles;
