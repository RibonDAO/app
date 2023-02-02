import { StyleSheet } from "react-native";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray10,
    minHeight: "100%",
    paddingHorizontal: 16,
  },
  title: {
    ...stylizedDisplaySm,
    marginBottom: 16,
  },
});

export default styles;
