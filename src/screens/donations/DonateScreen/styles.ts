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
  },
  inputEmailContainer: {
    width: "100%",
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
    height: "100%",
  },
  button: {
    height: 48,
  },
  cancelButton: {
    height: 32,
    marginTop: 14,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  textWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: 24,
    paddingTop: 34,
  },
});

export default styles;
