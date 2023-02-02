import { StyleSheet } from "react-native";
import {
  defaultBodyMdBold,
  defaultBodyMdRegular,
} from "styles/typography/default";

const styles = StyleSheet.create({
  cardsContainer: {
    marginBottom: 40,
    marginTop: 20
  },
  emptyImpactContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  emptyImpactTitle: {
    ...defaultBodyMdBold,
    marginTop: 16,
    marginBottom: 16
  },
  emptyImpactDescription: {
    ...defaultBodyMdRegular,
    textAlign: "center",
    marginBottom: 16
  },
  emptyImpactButton: {
    width: "80%"
  },
});

export default styles;
