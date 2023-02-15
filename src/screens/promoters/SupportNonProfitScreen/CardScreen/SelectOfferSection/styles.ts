import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsRegular } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

const { tertiary } = theme.colors.brand;

const styles = StyleSheet.create({
  title: {
    ...defaultBodyXsRegular,
    color: theme.colors.gray30,
    textAlign: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: tertiary[800],
    height: 40,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: tertiary[800],
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
    borderColor: tertiary[800],
  },
  dropdownTextStyles: {
    color: tertiary[800],
  },
  valueText: {
    ...stylizedDisplayXs,
    marginRight: 8,
    color: tertiary[800],
  },
  sliderStyle: { width: 180, marginTop: 8 },
});

export default styles;
