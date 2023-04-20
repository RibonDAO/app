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
    width: 336,
    borderRadius: 4,
    padding: theme.spacingNative(20),
    alignItems: "center",
    overflow: "hidden",
    color: theme.colors.neutral10,
    borderColor: theme.colors.neutral10,
    borderWidth: 1,
  },
  message: {
    marginRight: theme.spacingNative(8),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    marginRight: theme.spacingNative(8),
  },
  link: {
    ...defaultBodySmBold,
    color: theme.colors.neutral10,
    marginRight: theme.spacingNative(24),
    textDecorationLine: "underline",
  },
  wrapper: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
