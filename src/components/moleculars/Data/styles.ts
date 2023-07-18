import { StyleSheet } from "react-native";
import {
  defaultBodySmMedium,
  defaultHeadingXxs,
} from "styles/typography/default";

export default StyleSheet.create({
  container: {},
  data: {
    ...defaultHeadingXxs,
    color: "red",
  },
  label: {
    ...defaultBodySmMedium,
    color: "#999999",
  },
});
