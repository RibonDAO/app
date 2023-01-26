import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayXl } from "styles/typography/stylized";
import { defaultBodyXsRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.green20,
    height: 180,
    paddingBottom: 25,
    paddingTop: 65,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...stylizedDisplayXl,
    lineHeight: 60,
    color: theme.colors.neutral10,
  },
  subtitle: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral10,
  },
});

export default styles;
