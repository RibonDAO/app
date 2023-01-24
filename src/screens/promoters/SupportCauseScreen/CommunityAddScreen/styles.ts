import { StyleSheet } from "react-native";
import { stylizedTitleLarge } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
  },
  title: {
    ...stylizedTitleLarge,
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginTop: 24,
    resizeMode: "contain",
  },
  donateButton: {
    marginTop: 24,
  },
});

export default styles;
