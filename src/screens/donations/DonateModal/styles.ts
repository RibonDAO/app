import { Text, Image, View, StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "50%",
    position: "absolute",
    right: 0,
  },
  modalWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.gray30,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: theme.colors.gray30,
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  inputEmailContainer: {
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    backgroundColor: theme.colors.green30,
    color: theme.colors.neutral10,
  },
  nonProfitText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutral10,
    marginTop: 15,
    marginBottom: 16,
    lineHeight: 26,
  },
  nonProfitHighlight: {
    fontWeight: "900",
    color: theme.colors.neutral10,
    textTransform: "uppercase",
  },
  buttonContainer: {
    width: "100%",
    paddingLeft: 8,
    paddingRight: 8,
  },
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.colors.green30,
    color: theme.colors.neutral10,
  },
  footerText: {
    color: theme.colors.neutral10,
    marginVertical: 32,
  },
});

export default styles;
