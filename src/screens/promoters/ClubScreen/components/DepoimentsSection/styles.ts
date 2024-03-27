import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplayMd } from "styles/typography/stylized";
import {
  defaultBodySmMedium,
  defaultBodySmRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  container: {
    margin: theme.spacingNative(16),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    ...stylizedDisplayMd,
    color: theme.colors.neutral[800],
    alignSelf: "center",
    marginBottom: theme.spacingNative(24),
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: theme.spacingNative(16),
    alignItems: "flex-start",
    maxWidth: 300,
    backgroundColor: theme.colors.brand.tertiary[25],
    borderColor: theme.colors.brand.tertiary[25],
    marginRight: theme.spacingNative(16),
  },
  titleCard: {
    ...defaultBodySmMedium,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacingNative(4),
  },
  descriptionCard: {
    ...defaultBodySmRegular,
    color: theme.colors.neutral[700],
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacingNative(12),
    width: "80%",
  },
});

export default styles;
