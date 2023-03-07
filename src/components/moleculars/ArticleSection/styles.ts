import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdRegular,
  defaultBodySmBold,
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    ...defaultBodyMdRegular,
    color: theme.colors.neutral[800],
    width: "100%",
    marginVertical: theme.spacingNative(12),
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor: theme.colors.neutral[200],
    borderRadius: theme.spacingNative(8),
    borderColor: theme.colors.neutral[100],
    borderWidth: 1,
  },
  greenText: {
    ...defaultBodySmBold,
    marginLeft: theme.spacingNative(8),
    color: theme.colors.brand.primary[800],
  },
  orangeText: {
    ...defaultBodySmBold,
    marginLeft: theme.spacingNative(8),
    color: theme.colors.brand.secondary[800],
  },
  textSecondary: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[500],
  },
  textDivider: {
    marginHorizontal: theme.spacingNative(8),
  },
});

export default styles;
