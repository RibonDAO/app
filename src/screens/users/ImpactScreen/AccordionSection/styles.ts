import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  tabViewSection: {
    maxHeight: Dimensions.get("window").height,
    paddingBottom: theme.spacingNative(80) - theme.spacingNative(112),
    backgroundColor: "white",
  },
  pagerView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.neutral10,
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral[200],
    shadowColor: theme.colors.neutral10,
  },
  tabStyle: {
    width: 200,
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
});

export default styles;
