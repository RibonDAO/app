import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmBold,
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
  modalWrapper: {},
  container: {
    backgroundColor: theme.colors.neutral10,
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.gray30,
  },
  description: {
    ...defaultBodySmBold,
    marginBottom: 8,
    color: theme.colors.gray30,
  },
  logo: {
    width: "50%",
    height: "100%",
    borderBottomRightRadius: 18,
  },
  inputEmailContainer: {},
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  inputHint: {
    fontSize: 12,
    marginTop: 4,
  },
  nonProfitContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    backgroundColor: theme.colors.green20,
    color: theme.colors.neutral10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  nonProfitText: {
    ...defaultBodySmRegular,
    fontWeight: "500",
    color: theme.colors.neutral10,
    marginBottom: 4,
    flexWrap: "wrap",
  },
  nonProfitHighlight: {
    ...stylizedDisplaySm,
    color: theme.colors.neutral10,
    textTransform: "uppercase",
    flexWrap: "wrap",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
  },
  textWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 24,
  },
});

export default styles;
