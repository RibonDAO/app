import { Dimensions, StyleSheet } from "react-native";
import {
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";
import {
  stylizedDisplaySm,
  stylizedDisplayXs,
} from "styles/typography/stylized";

const { tertiary } = theme.colors.brand;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    backgroundColor: theme.colors.neutral10,
  },
  ContentContainer: {
    width: "100%",
    marginTop: 16,
    borderRadius: 8,
  },
  DonateContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: theme.colors.neutral[500],
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
    color: theme.colors.neutral[500],
  },
  CommunityAddValue: {
    ...stylizedDisplayXs,
    color: tertiary[200],
  },
  CommunityAddButton: {
    marginTop: 8,
    padding: 4,
    borderColor: tertiary[800],
    fontSize: 11,
    color: tertiary[800],
  },
  DonateButton: {
    borderColor: tertiary[200],
    fontWeight: "600",
    backgroundColor: tertiary[200],
    color: tertiary[800],
  },
  BackgroundImage: {
    display: "none",
    position: "absolute",
    right: 0,
    bottom: -200,
  },
  Title: {
    ...stylizedDisplaySm,
    marginRight: "5%",
    marginBottom: 16,
    color: theme.colors.neutral[800],
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
    backgroundColor: theme.colors.neutral10,
  },
  UserBalanceText: {
    ...defaultBodySmSemibold,
    marginBottom: 4,
    textAlign: "center",
    color: theme.colors.neutral[500],
  },
  UserBalanceTextHighlight: {
    ...defaultBodySmSemibold,
    color: tertiary[400],
  },
  RefundText: {
    ...defaultBodyXsRegular,
    marginTop: 4,
    textAlign: "center",
    color: theme.colors.neutral[500],
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  TooltipSection: {
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
  },
  scrollContainer: {
    backgroundColor: theme.colors.neutral10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardWaveContainer: {
    marginRight: 8,
    width: Dimensions.get("window").width - 64,
  },
  supportSection: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});

export default styles;
