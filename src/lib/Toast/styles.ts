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
    flexDirection: "row",
    width: 328,
    borderRadius: 4,
    padding: theme.spacingNative(20),
    alignItems: "center",
    overflow: "hidden",
    color: theme.colors.neutral10,
    borderColor: theme.colors.neutral10,
    borderWidth: 1,
  },
  message: {
    width: 224,
    marginBottom: theme.spacingNative(8),
    wordBreak: "break-word",
  },
  icon: {
    marginRight: theme.spacingNative(8),
    alignSelf: "flex-start",
  },
  link: {
    ...defaultBodySmBold,
    color: theme.colors.neutral10,
    textDecorationLine: "underline",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  closeIcon: {
    marginLeft: "auto",
    alignSelf: "flex-start",
  },
});

export default styles;
