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
    paddingBottom: theme.spacingNative(40),
  },
  groupButtonsContainer: {
    paddingTop: theme.spacingNative(16),
  },
  title: {
    ...stylizedDisplaySm,
    color: theme.colors.gray40,
    width: "100%",
  },
});

export default styles;
