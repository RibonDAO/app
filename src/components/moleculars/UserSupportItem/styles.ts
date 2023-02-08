

import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgBold,
  defaultBodyMdBold,
  defaultHeadingXs
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    maxWidth: 472,
    height: 160,
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: theme.colors.orange20,
    shadowColor: theme.colors.defaultShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    marginTop: 12
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 36,
    height: 36,
    backgroundColor: theme.colors.neutral10
  },
  title: {
    ...defaultHeadingXs,
    color: theme.colors.neutral10,
    marginLeft: 8
  },
  description: {
    ...defaultBodyMdBold,
    color: theme.colors.orange40,
    marginBottom: 12,
    marginTop: 8
  },
  supportButton: {
    backgroundColor: theme.colors.neutral10,
    borderWidth: 0
  },
});

export default styles;

