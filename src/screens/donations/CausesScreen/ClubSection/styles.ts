import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    marginTop: theme.spacingNative(40),
  },
  image: {
    width: "100%",
    height: 384,
    resizeMode: "cover",
  },
});

export default styles;
