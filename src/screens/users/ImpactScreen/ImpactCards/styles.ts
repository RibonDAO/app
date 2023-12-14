import { StyleSheet } from "react-native";
import { defaultBodyLgSemibold } from "styles/typography/default";

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
  },
  title: {
    ...defaultBodyLgSemibold,
  },
});

export default styles;
