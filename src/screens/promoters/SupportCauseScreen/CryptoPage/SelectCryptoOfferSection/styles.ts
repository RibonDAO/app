import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultParagraphSmall } from "styles/typography/default";

const styles = StyleSheet.create({
  title: {
    ...defaultParagraphSmall,
    color: theme.colors.gray30,
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
    marginTop: 8,
  },
});

export default styles;
