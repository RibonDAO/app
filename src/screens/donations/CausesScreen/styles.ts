import { stylizedHeadingMedium } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
  },
  title: {
    ...stylizedHeadingMedium,
    color: theme.colors.gray40,
    padding: 8,
    width: "100%",
    marginTop: 10,
  },
});

export default styles;
