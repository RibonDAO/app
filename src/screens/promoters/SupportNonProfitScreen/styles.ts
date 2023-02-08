import { StyleSheet } from "react-native";
import {
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayXs } from "styles/typography/stylized";

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    marginBottom: 100,
  },
  ContentContainer: {
    width: "100%",
    marginTop: 24,
    borderRadius: 8,
  },
  NonProfitsListContainer: {
    margin: -16,
  },
  DonateContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    shadowColor: theme.colors.gray30,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.32,
    shadowRadius: -2,
    elevation: 2,
  },
  GivingContainer: {
    marginBottom: 24,
    paddingHorizontal: 34,
  },
  ContributionContainer: {
    maxWidth: "100%",
    marginBottom: 34,
    paddingHorizontal: 18,
  },
  CommunityAddText: {
    ...defaultBodyXsRegular,
    color: theme.colors.gray30,
  },
  CommunityAddValue: {
    ...stylizedDisplayXs,
    color: theme.colors.red20,
  },
  CommunityAddButton: {
    marginTop: 8,
    padding: 4,
    borderColor: theme.colors.red40,
    fontSize: 11,
    color: theme.colors.red40,
  },
  DonateButton: {
    borderColor: theme.colors.red20,
    fontWeight: "600",
    backgroundColor: theme.colors.red20,
    color: theme.colors.red40,
  },
  BackgroundImage: {
    display: "none",
    position: "absolute",
    right: 0,
    bottom: -200,
  },
  Title: {
    ...stylizedDisplayXs,
    marginTop: 4,
    marginRight: "5%",
    marginBottom: 24,
    color: theme.colors.gray40,
  },
  SupportImage: {
    width: "100%",
    height: 136,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    objectFit: "cover",
    backgroundColor: theme.colors.gray10,
  },
  UserBalanceText: {
    ...defaultBodySmSemibold,
    marginBottom: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  UserBalanceTextHighlight: {
    ...defaultBodySmSemibold,
    color: theme.colors.red30,
  },
  RefundText: {
    ...defaultBodyXsRegular,
    marginTop: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  TooltipSection: {
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
  },
});

export default styles;
