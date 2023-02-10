import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacingNative(16),
    borderRadius: 4,
    overflow: "hidden",
    shadowColor: "#282428",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  firstChildContainer: {
    marginTop: theme.spacingNative(16),
  },
  imageContainer: {
    width: 296,
    height: 136,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  causeName: {
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    zIndex: 3,
    color: theme.colors.orange40,
    bottom: 5,
    left: 30,
  },
  intersection: {
    position: "absolute",
    top: 100,
    backgroundColor: "transparent",
  },
});

export default styles;
