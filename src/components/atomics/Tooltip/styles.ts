import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",
    backgroundColor: theme.colors.neutral[25],
    padding: 10,
    width: "93%",
    borderRadius: 10,
    shadowColor: theme.colors.gray40,
    elevation: 4,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tooltipText: {
    ...defaultBodySmRegular,
  },
  container: {},
});

export default styles;
