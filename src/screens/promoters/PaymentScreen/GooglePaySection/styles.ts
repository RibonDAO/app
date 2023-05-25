import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyLgBold } from "styles/typography/default";

const styles = StyleSheet.create({
  row: {
    marginTop: 30,
  },
  payButton: {
    marginTop: 30,
    width: 182,
    height: 48,
  },
  standardButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderColor: theme.colors.neutral[100],
  },
  standardButtonText: {
    ...defaultBodyLgBold,
  },
  addToWalletButton: {
    marginTop: 30,
    width: 190,
    height: 60,
  },
});

export default styles;
