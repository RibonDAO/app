import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultParagraphSmall,
  defaultSubtitleMedium,
} from "styles/typography/default";
import { stylizedTitleLarge } from "styles/typography/stylized";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 100,
    backgroundColor: theme.colors.neutral10,
  },
  contentContainer: {
    maxWidth: 472,
    marginTop: 24,
    borderRadius: 8,
    position: "relative",
    overflowX: "hidden",
  },
  donateContainer: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 8,
    shadowColor: theme.colors.defaultShadow10,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.32,
    shadowRadius: 2,
    elevation: 2,
  },
  givingContainer: {
    marginBottom: 24,
    padding: 0,
    paddingLeft: 34,
    paddingRight: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contributionContainer: {
    maxWidth: "100%",
    marginRight: 30,
  },
  communityAddContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  communityAddText: {
    ...defaultParagraphSmall,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.gray30,
  },
  communityAddValue: {
    ...stylizedTitleLarge,
    fontSize: 36,
    lineHeight: 48,
    color: theme.colors.orange20,
  },
  communityAddButton: {
    marginTop: 8,
    padding: 4,
    borderColor: theme.colors.orange40,
    fontSize: 11,
    color: theme.colors.orange40,
  },
  donateButton: {
    borderColor: theme.colors.orange20,
    fontWeight: "600",
    backgroundColor: theme.colors.orange20,
    color: theme.colors.orange40,
  },
  backgroundImage: {
    display: "none",
  },
  title: {
    ...stylizedTitleLarge,
    margin: 4,
    marginBottom: 24,
    color: theme.colors.gray40,
  },
  supportImage: {
    width: "100%",
    height: 140,
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  intersection: {
    position: "absolute",
    zIndex: 1,
    transform: [{ translateY: -100 }],
  },
  userBalanceText: {
    ...defaultSubtitleMedium,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  userBalanceTextHighlight: {
    ...defaultSubtitleMedium,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.orange30,
  },
  refundText: {
    ...defaultParagraphSmall,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
});

export default styles;
