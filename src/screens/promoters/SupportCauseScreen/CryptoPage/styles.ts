import { StyleSheet } from "react-native";
import { stylizedTitleLarge } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultParagraphSmall,
  defaultSubtitleMedium,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    ...stylizedTitleLarge,
    marginTop: 4,
    marginRight: 0,
    marginBottom: 24,
    marginLeft: 0,
    color: theme.colors.gray40,
  },
  contentContainer: {
    maxWidth: 472,
    marginTop: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    position: "relative",
    overflowX: "hidden",
  },
  supportImage: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  donateContainer: {
    marginBottom: 24,
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  givingContainer: {
    marginBottom: 24,
    paddingTop: 0,
    paddingRight: 34,
    paddingBottom: 0,
    paddingLeft: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  contributionContainer: {},
  communityAddContainer: {
    marginTop: 34,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  communityAddText: {
    ...defaultParagraphSmall,
    color: theme.colors.gray30,
  },
  communityAddValue: {
    ...stylizedTitleLarge,
    color: theme.colors.orange20,
  },
  userBalanceText: {
    ...defaultSubtitleMedium,
    color: theme.colors.gray40,
    marginBottom: 4,
    textAlign: "center",
  },
  refundText: {
    ...defaultParagraphSmall,
    color: theme.colors.gray30,
    marginTop: 4,
    textAlign: "center",
  },
});

export default styles;
