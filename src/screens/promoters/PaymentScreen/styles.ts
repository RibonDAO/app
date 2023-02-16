import { StyleSheet } from "react-native";
import { stylizedDisplayLg } from "styles/typography/stylized";
import {
  defaultBodyMdRegular,
  defaultBodyXsRegular,
  defaultBodyMdSemibold,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  innerContainer: {
    backgroundColor: theme.colors.neutral10,
    borderRadius: 8,
    height: "100%",
  },
  container: {
    flex: 1,
    marginTop: theme.spacingNative(16),
    shadowColor: theme.colors.gray40,
    elevation: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  contentContainer: {
    paddingHorizontal: theme.spacingNative(24),
    paddingVertical: theme.spacingNative(16),
    borderRadius: 8,
  },
  donationValueText: {
    ...stylizedDisplayLg,
    textAlign: "center",
    color: "gray40",
    marginVertical: 12,
  },
  title: {
    ...defaultBodyMdRegular,
    textAlign: "center",
  },
  titleHighlight: {
    ...defaultBodyMdSemibold,
    color: theme.colors.gray40,
  },
  feeText: {
    ...defaultBodyXsRegular,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  image: {
    width: "100%",
    height: 148,
  },
  backArrowButton: {
    width: 24,
    height: 24,
    marginBottom: theme.spacingNative(20),
  },
  donateButtonContainer: {
    width: "100%",
    backgroundColor: "neutral10",
    padding: theme.spacingNative(16),
  },
  donateButton: {
    height: 48,
  },
});

export default styles;
