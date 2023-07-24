import { StyleSheet } from "react-native";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export default StyleSheet.create({
  container: {},
  text: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[800],
  },
  boldText: {
    ...defaultBodyMdBold,
    color: theme.colors.neutral[800],
  },
  embeddedVideo: {
    width: "100%",
    height: 230,
    marginTop: theme.spacingNative(16),
  },
});
