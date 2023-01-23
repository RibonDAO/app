import { StyleSheet } from "react-native";
import { stylizedHeadingMedium } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
    height: "100%",
  },
  icon: {
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  title: {
    marginTop: 32,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 36,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    marginBottom: 20,
  },
});

export default styles;
