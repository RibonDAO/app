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
    shadowColor: theme.colors.neutral10,
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
    padding: theme.spacingNative(16),
    backgroundColor: theme.colors.neutral10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabContainer: {
    paddingLeft: theme.spacingNative(2),
    marginBottom: theme.spacingNative(8),
  },
});

export default styles;
