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
    shadowRadius: 12,
  },
  firstChildContainer: {
    marginTop: theme.spacingNative(16),
  },
  imageContainer: {
    width: 320,
    height: 136,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  label: {
    position: "absolute",
    flexDirection: "row",
    top: 12,
    left: 12,
    zIndex: 2,
    backgroundColor: theme.colors.orange20,
    paddingHorizontal: 8,
    paddingBottom: 2,
    paddingTop: 4,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  labelTitle: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 4,
    color: theme.colors.orange40
  },
  contentContainer: {
    position: "absolute",
    bottom: 12,
    left: 20,
    elevation: 24,
    zIndex: 2
  },
  causeName: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.neutral10,
  },
  causeTitle: {
    fontSize: 14,
    color: theme.colors.neutral10,
    marginBottom: 4
  },
  intersection: {
    position: "absolute",
    top: 100,
    backgroundColor: "transparent",
  },
  overlay: {
    flex: 1,
    width: 320,
    height: 136,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6,
    elevation: 2,
    backgroundColor: theme.colors.gray40,
  },
});

export default styles;
