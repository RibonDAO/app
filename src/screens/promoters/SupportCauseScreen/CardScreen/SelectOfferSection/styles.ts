import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultParagraphSmall } from "styles/typography/default";
import { stylizedTitleLarge } from "styles/typography/stylized";

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
    ...stylizedTitleLarge,
    marginRight: 8,
    color: theme.colors.orange20,
  },
});

export default styles;
