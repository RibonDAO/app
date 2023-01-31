import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import { defaultBodyLgBold, defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  impactCardContainer: {
    display: "flex",
    flexDirection: "row",
    width: 330,
    height: 108,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    marginRight: 8
  },
  impact: {
    ...defaultBodyLgBold,
    marginTop: 8,
    color: theme.colors.green30,
  },
  description: {
    ...defaultBodyXsRegular,
    marginTop: 4,
    color: theme.colors.gray30,
    fontSize: 12,
  },
  imageSection: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 60,
    height: 60
  },
  contentSection: {
    width: "75%",
    height: "100%",
    marginLeft: 12,
    justifyContent: "center"
  },
});

export default styles;
