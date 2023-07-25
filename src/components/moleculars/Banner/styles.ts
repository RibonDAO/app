import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    maxWidth: 472,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: theme.spacingNative(16),
    marginBottom: theme.spacingNative(12),
    display: "flex",
  },
  iconContainer: {
    marginRight: theme.spacingNative(8),
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {},
  subTitle: {
    marginBottom: theme.spacingNative(4),
  },
  text: {
    ...defaultBodySmRegular,
    marginTop: theme.spacingNative(4),
  },
  childrenContainer: {
    marginTop: theme.spacingNative(12),
  },
  arrowContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacingNative(16),
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
    padding: 3.2,
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default styles;
