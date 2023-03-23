import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";
import {
  defaultBodySmRegular,
  defaultBodyXsSemibold,
} from "styles/typography/default";

const styles = StyleSheet.create({
  section: {
    width: "100%",
    height: 20,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: 5,
    textAlign: "center",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    ...defaultBodyXsSemibold,
    textAlign: "center",
    position: "absolute",
    width: "100%",
    color: theme.colors.neutral[800],
  },
  progress: {
    flex: 1,
    height: 20,
    backgroundColor: theme.colors.brand.primary[300],
    borderRadius: 5,
    position: "absolute",
  },
});

export default styles;
