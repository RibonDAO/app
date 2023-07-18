import { StyleSheet } from "react-native";
import {
  defaultBodySmMedium,
  defaultHeadingMd,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    marginBottom: theme.spacingNative(24),
  },
  dataContainer: {
    marginBottom: 16,
  },
  tooltipCardContainer: {
    width: "100%",
    marginTop: theme.spacingNative(16),
    marginBottom: theme.spacingNative(16),
    marginLeft: -16,
    backgroundColor: "#F5F5F5",
  },
  innerCardContainer: {
    width: "100%",
    paddingTop: theme.spacingNative(24),
    paddingRight: theme.spacingNative(16),
    paddingBottom: theme.spacingNative(24),
    paddingLeft: theme.spacingNative(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.brand.primary[50],
  },
  subtitleContainer: {
    width: 280,
    marginRight: theme.spacingNative(18),
    flexWrap: "wrap",
    backgroundColor: theme.colors.brand.primary[50],
  },
  iconContainer: {
    padding: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  boost: {
    fontSize: 28,
    color: theme.colors.brand.primary[500],
  },
  title: {
    ...defaultHeadingMd,
    color: theme.colors.brand.primary[800],
  },
  text: {
    color: "#999999",
    ...defaultBodySmMedium,
  },
});

export default styles;
