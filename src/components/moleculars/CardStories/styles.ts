import { StyleSheet } from "react-native";
import {
  defaultBodyLgBold,
  defaultBodyMdRegular,
  defaultBodySmBold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 38,
    paddingHorizontal: 16,
  },
  containerModal: {
    backgroundColor: "#000",
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  passStoryView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: "90%",
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 40,
  },
  title: {
    ...defaultBodySmBold,
    color: theme.colors.neutral10,
    marginBottom: 2,
  },
  subtitle: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral10,
  },
  titlesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  heading: {
    ...defaultBodyLgBold,
    color: theme.colors.neutral10,
    marginBottom: 10,
    fontSize: 30,
    lineHeight: 36,
  },
  description: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral10,
  },
  crossIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  leftHeadingView: {
    height: 120,
    width: 4,
    backgroundColor: theme.colors.green30,
    marginRight: 20,
    borderRadius: 10,
  },
});

export default styles;
