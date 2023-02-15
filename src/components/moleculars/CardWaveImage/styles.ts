import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdBold,
  defaultBodySmSemibold,
  defaultBodyXsRegular,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const { tertiary } = theme.colors.brand;

const styles = StyleSheet.create({
  title: {
    ...defaultBodyMdBold,
    color: tertiary[800],
    textAlign: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: theme.colors.orange40,
    height: 40,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: theme.colors.orange40,
    fontWeight: "bold",
    marginRight: 4,
    flex: 3,
  },
  inputsContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  dropdownContainerStyles: {
    width: 80,
  },
  valueText: {
    ...stylizedDisplayXs,
    marginRight: 8,
    color: theme.colors.brand.tertiary[800],
  },
  sliderStyle: { width: 180, marginTop: 8 },
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  contentContainer: {
    marginTop: 16,
    borderRadius: 8,
    position: "relative",
    overflowX: "hidden",
    shadowColor: theme.colors.gray40,
    backgroundColor: theme.colors.neutral10,
    elevation: 2,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  donateContainer: {
    padding: 24,
    borderRadius: 8,
    shadowColor: theme.colors.defaultShadow10,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.32,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: theme.colors.neutral10,
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
  },
  communityAddContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  communityAddText: {
    ...defaultBodyXsRegular,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.gray30,
  },
  communityAddValue: {
    ...stylizedDisplayXs,
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
  subtitle: {
    ...defaultBodyXsRegular,
    marginBottom: 16,
    marginTop: 12,
    color: theme.colors.gray40,
    textAlign: "center",
    minHeight: 40,
  },
  supportImage: {
    width: "100%",
    height: 148,
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
    ...defaultBodySmSemibold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
  userBalanceTextHighlight: {
    ...defaultBodySmSemibold,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.orange30,
  },
  refundText: {
    ...defaultBodyXsRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    textAlign: "center",
    color: theme.colors.gray30,
  },
});

export default styles;
