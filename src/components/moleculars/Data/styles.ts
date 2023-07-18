import { StyleSheet } from "react-native";
import {
  defaultBodySmMedium,
  defaultHeadingXxs,
} from "styles/typography/default";

export default StyleSheet.create({
  container: {},
  data: {
    ...defaultHeadingXxs,
    color: "#777777",
  },
  label: {
    ...defaultBodySmMedium,
    color: "#999999",
  },
});
