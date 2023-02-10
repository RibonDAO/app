import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  supportContainer: {
    position: "absolute",
    right: -5,
    top: 50,
    height: 160,
    width: 300,
    borderRadius: 16,
    borderColor: theme.colors.gray20,
    backgroundColor: theme.colors.neutral10,
    borderWidth: 1,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  configItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 53,
    borderColor: theme.colors.gray20,
    borderBottomWidth: 2,
  },
  text: {
    paddingLeft: theme.spacingNative(8),
  },
  iconContainer: {
    width: "10%",
  },
  textContainer: {
    width: "60%",
  },
  ctaContainer: {
    width: "30%",
    paddingRight: theme.spacingNative(8),
  },
  configContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketSection: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacingNative(12),
  },
  ticketCounter: {
    marginRight: theme.spacingNative(4),
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.green30,
  },
});

export default styles;
