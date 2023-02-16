import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  tabViewSection: {
    height: 500,
    marginTop: theme.spacingNative(20),
  },
  pagerView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.neutral10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray20,
  },
  tabStyle: {
    width: 200,
  },
  tabBarTitle: {
    color: theme.colors.gray30,
    textAlign: "center",
    fontSize: 16,
  },
  indicatorStyle: {
    backgroundColor: theme.colors.green30,
    padding: 1.5,
    marginBottom: -2,
  },
});

export default styles;
