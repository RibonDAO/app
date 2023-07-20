import { StyleSheet } from "react-native";
import { defaultBodyXsRegular } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export default StyleSheet.create({
  container: {},
  giftCard: {
    marginRight: -16,
    marginBottom: 40,
    marginLeft: -16,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  giftDonationCycleImage: {
    width: "100%",
    height: 126,
    resizeMode: "cover",
  },
  realTimeDonationContainer: {
    padding: 8,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  realTimeDonationLabel: {
    ...defaultBodyXsRegular,
    backgroundColor: theme.colors.feedback.success[50],
    color: theme.colors.brand.primary[900],
  },
});
