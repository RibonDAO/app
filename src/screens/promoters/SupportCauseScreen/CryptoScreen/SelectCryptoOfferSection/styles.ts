import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  title: {
    ...defaultBodyXsRegular,
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
    flex: 2,
  },
  sliderStyle: {
    marginTop: 8
  }
});

export default styles;
