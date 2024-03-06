import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: theme.colors.neutral10,
  },
  containerPadding: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: "100%",
    marginTop: theme.spacingNative(40),
  },
  image: {
    width: "100%",
    height: 384,
    resizeMode: "cover",
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
});

export default styles;
