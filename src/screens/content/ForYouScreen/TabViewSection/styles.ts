import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplaySm } from "styles/typography/stylized";

const styles = StyleSheet.create({
  tabViewSection: {
    minHeight: "100%",
  },
  pagerView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.neutral10,
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  tabStyle: {
    width: Dimensions.get("window").width / 2,
  },
  tabBarTitle: {
    color: theme.colors.neutral[500],
    textAlign: "center",
    fontSize: 16,
  },
  indicatorStyle: {
    backgroundColor: theme.colors.brand.primary[300],
    padding: 1.5,
    marginBottom: -2,
  },
  title: {
    ...stylizedDisplaySm,
    color: theme.colors.neutral[800],
    width: "100%",
    marginBottom: theme.spacingNative(16),
  },
  paddingContainer: {
    paddingHorizontal: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
  },
  tabViewContainer: {
    marginTop: theme.spacingNative(112),
  },
  redBall: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: theme.colors.feedback.error[500],
    borderRadius: 100,
    top: 0,
  },
  tabContainer: {
    width: 2000,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
  },
});

export default styles;
