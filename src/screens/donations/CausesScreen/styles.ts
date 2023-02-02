import { stylizedDisplaySm } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
  },
  containerTicket: {
    height: 350,
  },
  causesCardContainer: {
    height: "auto",
    width: 300,
  },
  causesContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 40,
  },
  groupButtonsContainer: {
    paddingTop: 16,
  },
  title: {
    ...stylizedDisplaySm,
    color: theme.colors.gray40,
    width: "100%",
  },
});

export default styles;
