import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdSemibold } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: theme.colors.neutral10,
  },
  containerPadding: {
    paddingHorizontal: 16,
    borderColor: theme.colors.neutral10,
    backgroundColor: theme.colors.neutral10,
    borderRadius: 16,
    top: -16,
  },
  containerTicket: {
    height: 350,
    width: "100%",
    margin: 0,
  },
  causesCardContainer: {
    width: 256,
    marginHorizontal: theme.spacingNative(4),
    marginBottom: theme.spacingNative(16),
  },
  causesContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacingNative(16),
  },
  noCausesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacingNative(16),
  },
  groupButtonsContainer: {
    paddingTop: theme.spacingNative(16),
  },
  title: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[800],
    width: "100%",
  },
  ticketExplanationSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacingNative(12),
  },
  ticketText: {
    color: theme.colors.neutral[500],
    marginLeft: theme.spacingNative(4),
    lineHeight: 22,
  },
  ticketTextContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
    margin: -2,
    marginBottom: 0,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: theme.colors.neutral10,
  },
  notificationWrapper: {
    marginBottom: theme.spacingNative(16),
  },
  divider: {
    backgroundColor: theme.colors.neutral[50],
    width: "100%",
    height: 8,
  },
});

export default styles;
