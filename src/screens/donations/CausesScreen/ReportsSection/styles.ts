import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacingNative(16),
  },
  title: {
    ...defaultBodyLgSemibold,
  },
  description: {
    ...defaultBodySmRegular,
  },
  reportList: {
    marginTop: 10,
  },
  flatList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardViewItem: {
    marginHorizontal: 6,
  },
});

export default styles;
