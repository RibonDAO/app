import { StyleSheet } from "react-native";
import { stylizedHeadingLarge } from "styles/typography/stylized";
import {
  defaultParagraphLarge,
  defaultParagraphSmall,
  defaultSubtitleLarge,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  container: {},
  contentContainer: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 8,
  },
  donationValueText: {
    ...stylizedHeadingLarge,
    textAlign: "center",
    color: "gray40",
  },
  title: {
    ...defaultParagraphLarge,
    textAlign: "center",
  },
  titleHighlight: {
    ...defaultSubtitleLarge,
    color: theme.colors.gray40,
  },
  feeText: {
    ...defaultParagraphSmall,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  image: {
    width: "100%",
    height: "100%",
    marginTop: 64,
  },
  backArrowButton: {
    width: 24,
    height: 24,
    marginBottom: 20,
  },
  donateButtonContainer: {
    width: "100%",
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "neutral10",
  },
  donateButton: {
    borderColor: "shade20",
    backgroundColor: "shade20",
    color: "shade40",
  },
});
