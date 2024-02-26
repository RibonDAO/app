import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdBold } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketSection: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacingNative(12),
  },
  ticketCounter: {
    ...defaultBodyMdBold,
    lineHeight: 17,
    marginRight: theme.spacingNative(4),
    marginLeft: theme.spacingNative(4),
  },
});

export default styles;
