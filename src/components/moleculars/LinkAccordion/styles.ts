import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: theme.colors.neutral[100],
    borderWidth: 1,
    borderRadius: 8,
    position: "relative",
  },
  linkListItem: {
    width: "100%",
    padding: theme.spacingNative(20),
    borderBottomColor: theme.colors.neutral[100],
    borderBottomWidth: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  thumb: {
    width: 20,
    height: 20,
    marginRight: theme.spacingNative(4),
    borderColor: theme.colors.neutral[600],
    borderWidth: 2,
    borderRadius: 50,
    position: "relative",
  },
  thumbSelected: {
    borderColor: theme.colors.brand.primary[600],
    borderWidth: 6,
  },
  linkRow: {
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  rightIcon: {
    width: 28,
  },
  linkContent: {
    width: "100%",
    marginTop: theme.spacingNative(20),
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  rightElement: {},
  title: {
    marginHorizontal: theme.spacingNative(8),
  },
});

export default styles;
