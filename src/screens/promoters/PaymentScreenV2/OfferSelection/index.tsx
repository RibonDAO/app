import { Currencies, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { Text, TouchableOpacity, View } from "react-native";
import EditIcon from "../assets/EditIcon";
import S from "./styles";
import CurrencyExchangeIcon from "../assets/CurrencyExchangeIcon";

export type Props = {
  currentOffer: Offer;
  handleOfferChange?: () => void;
  handleCurrencyChange?: () => void;
};

function OfferSelection({
  currentOffer,
  handleOfferChange,
  handleCurrencyChange,
}: Props): JSX.Element {
  const { cardGivingFees } = useCardGivingFees(
    currentOffer.priceValue,
    currentOffer.currency.toUpperCase() as Currencies,
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  return (
    <View style={S.container}>
      <View style={S.offer}>
        <Text style={S.offerPrice}>{currentOffer.price}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity accessibilityRole="button" onPress={handleOfferChange} style={S.editButton}>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" onPress={handleCurrencyChange} style={S.editButton}>
            <CurrencyExchangeIcon />
          </TouchableOpacity>
        </View>
      </View>
      {cardGivingFees ? (
        <View style={S.cardGivingInfoWrapper}>
          <Text style={[S.infoText, { marginRight: 16 }]}>
            {t("netDonation")}
            {cardGivingFees?.netGiving}
          </Text>
          <Text style={S.infoText}>
            {t("serviceFees")}
            {cardGivingFees?.serviceFees}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

export default OfferSelection;
