import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgBold,
  defaultBodySmRegular,
} from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "50%",
    position: "absolute",
    right: 0,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: theme.spacingNative(16),
    marginTop: theme.spacingNative(24),
  },
  animationContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacingNative(8),
    color: theme.colors.gray30,
  },
  description: {
    ...defaultBodyLgBold,
    marginBottom: theme.spacingNative(16),
    fontSize: 20,
    textAlign: "center",
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  nonProfitLogo: {
    width: 100,
    height: 100,
  },
  inputEmailContainer: {
    width: "100%",
    marginTop: 14,
  },
  inputHint: {
    fontSize: 12,
    marginTop: theme.spacingNative(4),
  },
  nonProfitContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: theme.spacingNative(16),
    backgroundColor: theme.colors.green40,
    color: theme.colors.neutral10,
  },
  nonProfitText: {
    ...defaultBodySmRegular,
    fontWeight: "500",
    color: theme.colors.neutral10,
    marginBottom: theme.spacingNative(4),
    flexWrap: "wrap",
  },
  nonProfitHighlight: {
    ...stylizedDisplaySm,
    color: theme.colors.neutral10,
    flexWrap: "wrap",
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
  },
  button: {
    height: 48,
  },
  cancelButton: {
    height: 32,
    marginTop: theme.spacingNative(16),
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  textWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: theme.spacingNative(24),
    paddingTop: theme.spacingNative(32),
  },
  ticketImage: {
    height: 88,
    width: 88,
  },
  privacyPolicyText: {
    ...defaultBodySmRegular,
    color: theme.colors.gray20,
    textAlign: "center",
    marginTop: theme.spacingNative(16),
  },
  privacyPolicyLink: {
    color: theme.colors.green30,
  }
});

export default styles;
