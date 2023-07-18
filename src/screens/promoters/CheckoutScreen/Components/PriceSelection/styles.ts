import { defaultBodyXsRegular } from "styles/typography/default";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { StyleSheet } from "react-native";
import { theme } from "@ribon.io/shared/styles";

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacingNative(8),
  },
  offer: {
    display: "flex",
    flexDirection: "row",
  },
  offerPrice: {
    ...stylizedDisplayMd,
    color: theme.colors.brand.primary[800],
    marginRight: theme.spacingNative(8),
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brand.primary[50],
    marginRight: theme.spacingNative(8),
  },
  cardGivingInfoWrapper: {
    marginVertical: theme.spacingNative(8),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    ...defaultBodyXsRegular,
    color: theme.colors.neutral[500],
    display: "flex",
  },
});

export default styles;
