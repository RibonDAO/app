import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export default StyleSheet.create({
  outerContainer: {
    backgroundColor: theme.colors.brand.secondary[50],
  },
  container: {
    width: "100%",
    maxWidth: 472,
    height: 128,
    padding: 16,
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1,
  },
  content: {
    marginBottom: 12,
    flexDirection: "column",
  },
  iconContainer: {
    marginRight: 8,
    backgroundColor: "#fff",
    padding: 4,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    borderRadius: 50,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "column",
  },
  title: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[900],
  },
  subtitle: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[800],
  },
  text: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[800],
  },
  childrenContainer: {
    marginTop: 12,
    display: "flex",
  },
  arrowContainer: {
    position: "relative",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    right: 0,
    top: 0,
    resizeMode: "cover",
    height: "100%",
  },
});
