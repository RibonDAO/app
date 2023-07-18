import { StyleSheet } from "react-native";
import { defaultBodySmMedium } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  subtitle: {
    ...defaultBodySmMedium,
    color: "#333333",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
});

export default styles;
