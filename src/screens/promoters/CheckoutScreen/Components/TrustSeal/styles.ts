import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import { defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[600],

    marginRight: theme.spacingNative(4),
  },
  image: {
    marginLeft: theme.spacingNative(4),
  },
});

export default styles;
