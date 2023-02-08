import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import {
  defaultBodyLgBold,
  defaultBodyXsRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  badgeContainer: {
    marginBottom: 10,
    width: "50%"
  },
  badgeRoundContainer: {
    height: 108,
    borderRadius: 8,
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    marginRight: 8,
    elevation: 18,
  },
  impact: {
    ...defaultBodyLgBold,
    color: theme.colors.green40,
  },
  description: {
    ...defaultBodyXsRegular,
    marginTop: 4,
    color: theme.colors.gray30,
    fontSize: 12,
  },
});

export default styles;
