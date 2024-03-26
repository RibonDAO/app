import { theme } from "@ribon.io/shared";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: theme.spacingNative(16),
    alignItems: "flex-start",
    width: 328,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: 200,
  },
  title: {
    color: theme.colors.neutral[800],
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    width: "auto",
  },
  subtitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitleIcon: {},
});

export default styles;
