import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: theme.colors.neutral10,
  },
  containerTicket: {
    height: 350,
    width: "100%",
    margin: 0,
  },
  causesCardContainer: {
    height: "auto",
    width: 300,
  },
  causesContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(20),
  },
  groupButtonsContainer: {
    paddingTop: theme.spacingNative(16),
  },
  title: {
    ...stylizedDisplaySm,
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
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    color: theme.colors.neutral[500],
    marginLeft: theme.spacingNative(4),
  },
  tooltip: {
    position: "absolute",
    backgroundColor: theme.colors.neutral10,
  },
});

export default styles;
