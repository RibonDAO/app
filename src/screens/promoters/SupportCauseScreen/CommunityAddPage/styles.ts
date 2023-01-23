import { StyleSheet } from "react-native";
import { stylizedTitleLarge } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  desktopContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutral10,
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.neutral10,
  },
  title: {
    ...stylizedTitleLarge,
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginTop: 24,
  },
  donateButton: {
    marginTop: 34,
  },
});

export default styles;
