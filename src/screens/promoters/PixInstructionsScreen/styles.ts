import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdSemibold,
  defaultBodyXsBold,
  defaultBodyXsRegular,
  defaultBodyXsSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
  },
  container: {
    height: "100%",
  },
  mainContainer: {
    padding: theme.spacingNative(16),
  },
  pixContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[800],
  },
  payableName: {
    ...defaultBodyMdSemibold,
    color: theme.colors.brand.primary[800],
  },
  keyboardView: {
    height:
      Platform.OS === "android" ? Dimensions.get("window").height : "100%",
  },
  circle: {
    display: "flex",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brand.primary[50],

    borderRadius: 50,
    borderColor: theme.colors.brand.primary[50],
    marginRight: theme.spacingNative(8),
  },
  number: {
    ...defaultBodyXsBold,
    color: theme.colors.brand.primary[800],
  },
  instructionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacingNative(8),
  },
  arrow: {
    padding: theme.spacingNative(16),
    alignSelf: "flex-start",
  },
  qrcode: {
    width: 200,
    height: 200,
  },
  pixCode: {
    ...defaultBodyMdSemibold,
    color: theme.colors.neutral[800],
    marginTop: theme.spacingNative(24),
  },
  info: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[800],
  },
  infoBold: {
    ...defaultBodyXsSemibold,
    color: theme.colors.neutral[800],
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "90%",
    justifyContent: "flex-start",
    paddingRight: theme.spacingNative(8),
  },
  borderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    paddingBottom: theme.spacingNative(20),
    marginBottom: theme.spacingNative(16),
  },
});

export default styles;
