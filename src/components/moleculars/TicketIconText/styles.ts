import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultHeadingXxs } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  ticketSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacingNative(12),
  },
  ticketCounter: {
    ...defaultHeadingXxs,
    marginRight: theme.spacingNative(4),
    marginLeft: theme.spacingNative(4),
  },
});

export default styles;
