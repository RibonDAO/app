import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmBold, defaultHeadingXs } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    maxWidth: 472,
    height: 160,
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: theme.colors.brand.secondary[300],
    shadowColor: theme.colors.defaultShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    marginVertical: 16,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 32,
    height: 32,
    backgroundColor: theme.colors.neutral10,
  },
  title: {
    ...defaultHeadingXs,
    color: theme.colors.neutral10,
    marginLeft: 12,
  },
  description: {
    ...defaultBodySmBold,
    color: theme.colors.brand.secondary[700],
    marginBottom: 12,
    marginTop: 8,
  },
  supportButton: {
    backgroundColor: theme.colors.neutral10,
    borderWidth: 0,
    height: 48,
  },
});

export default styles;
