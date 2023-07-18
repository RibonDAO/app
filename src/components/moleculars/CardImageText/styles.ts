import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmRegular,
  defaultBodyXsRegular,
  defaultHeadingXs,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.neutral10,
    padding: theme.spacingNative(16),
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 18,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: theme.spacingNative(12),
    objectFit: "cover",
  },
  text: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacingNative(8),
  },
  footerText: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[500],
  },
  title: {
    ...defaultHeadingXs,
    marginBottom: theme.spacingNative(8),
  },
  subtitle: {
    ...defaultBodySmRegular,
    marginBottom: theme.spacingNative(8),
  },
  insideContainer: {
    display: "flex",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginBottom: theme.spacingNative(8),
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: theme.spacingNative(8),
    backgroundColor: theme.colors.brand.primary[50],
    borderRadius: 30,
  },
  label: {
    color: theme.colors.brand.primary[800],
  },
  button: {
    width: "100%",
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#FF5F5F",
    color: "#FFFFFF",
  },
});

export default styles;
