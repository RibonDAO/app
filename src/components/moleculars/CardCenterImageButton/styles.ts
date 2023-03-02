import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmRegular } from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    borderRadius: 12,
    backgroundColor: theme.colors.neutral10,
  },
  containerImage: {
    position: "relative",
    borderRadius: 12,
  },
  darkStroke: {
    height: 100,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  cardWrapper: {
    flexDirection: "column",
    borderRadius: 12,
    height: "auto",
    width: "100%",
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1.1,
    borderRadius: 12,
  },
  infoContainer: {
    width: "100%",
    marginBottom: theme.spacingNative(16),
    marginTop: theme.spacingNative(8),
    display: "flex",
    flexDirection: "row",
  },
  bullet: {
    marginLeft: theme.spacingNative(4),
    marginRight: theme.spacingNative(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: theme.colors.neutral[800],
  },
  info: {
    textAlign: "center",
    color: theme.colors.neutral[800],
  },
  icon: {
    marginTop: theme.spacingNative(4),
    marginLeft: theme.spacingNative(4),
  },
  imageDescription: {
    padding: theme.spacingNative(16),
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    color: theme.colors.neutral10,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  containerText: {
    paddingTop: theme.spacingNative(8),
    paddingBottom: theme.spacingNative(12),
    paddingLeft: theme.spacingNative(12),
    paddingRight: theme.spacingNative(12),
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral10,
    marginLeft: 4,
    lineHeight: 16,
  },
  labelContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 30,
    backgroundColor: "rgba(48, 45, 39, 0.7)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    zIndex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default styles;
