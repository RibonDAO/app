import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    marginLeft: -16,
    marginRight: -16,
    marginBottom: theme.spacingNative(16),
    padding: theme.spacingNative(16),
    paddingTop: theme.spacingNative(24),
    paddingBottom: theme.spacingNative(24),
  },
  squareImageContainer: {
    marginRight: theme.spacingNative(16),
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  title: {},
  subTitle: {
    marginBottom: theme.spacingNative(4),
  },
  text: {
    ...defaultBodySmMedium,
    marginTop: theme.spacingNative(4),
    padding: theme.spacingNative(1),
  },
  childrenContainer: {
    marginTop: theme.spacingNative(12),
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default styles;
