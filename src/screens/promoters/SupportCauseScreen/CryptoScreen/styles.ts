import { StyleSheet } from "react-native";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyXsRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    ...stylizedDisplayXs,
    marginRight: 0,
    marginBottom: 24,
    marginLeft: 0,
    color: theme.colors.gray40,
  },
  contentContainer: {
    maxWidth: 472,
    marginTop: 24,
    marginBottom: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    position: "relative",
    shadowColor: theme.colors.gray40,
    backgroundColor: theme.colors.neutral10,
    elevation: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  supportImage: {
    height: 148,
    width: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  communityAddText: {
    ...defaultBodyXsRegular,
    color: theme.colors.gray30,
  },
  communityAddValue: {
    ...stylizedDisplayXs,
    color: theme.colors.orange20,
  },
  userBalanceText: {
    ...defaultBodySmSemibold,
    color: theme.colors.gray40,
    marginBottom: 4,
    textAlign: "center",
  },
  refundText: {
    ...defaultBodyXsRegular,
    color: theme.colors.gray30,
    marginTop: 4,
    textAlign: "center",
  },
});

export default styles;
