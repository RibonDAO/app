import { StyleSheet } from "react-native";
import {
  defaultBodySmMedium,
  defaultHeadingMd,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    marginBottom: 24,
  },
  dataContainer: {
    marginBottom: 16,
  },
  tooltipCardContainer: {
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: -16,
    backgroundColor: "#F5F5F5",
  },
  innerCardContainer: {
    width: "100%",
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleContainer: {
    width: 280,
    marginRight: 18,
    flexWrap: "wrap",
  },
  iconContainer: {
    padding: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  boost: {
    fontSize: 16,
    color: "#FF5F5F",
  },
  title: {
    ...defaultHeadingMd,
    color: "#FF5F5F",
  },
  text: {
    color: "#999999",
    ...defaultBodySmMedium,
  },
});

export default styles;
