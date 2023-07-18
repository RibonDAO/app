import { StyleSheet } from "react-native";
import {
  defaultBodyMdRegular,
  defaultHeadingXxs,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    ...defaultHeadingXxs,
  },
  subtitle: {
    ...defaultBodyMdRegular,
    color: "#777777",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  textContainer: {},
});

export default styles;
