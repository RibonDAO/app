import { Currencies, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { Text, TouchableOpacity, View } from "react-native";
import EditIcon from "../../assets/EditIcon";
import S from "./styles";

export type Props = {
  currentOffer?: Offer;
  priceValue?: string;
  onEditClick?: () => void;
  tokenSymbol?: string;
};

function PriceSelection({
  currentOffer,
  priceValue,
  onEditClick,
  tokenSymbol,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  const { cardGivingFees } = useCardGivingFees(
    currentOffer?.priceValue || 0,
    currentOffer?.currency.toUpperCase() as Currencies,
  );

  const price = currentOffer?.price || `${tokenSymbol} ${priceValue}`;
  const hasAdditionalTaxes =
    currentOffer?.gateway === "stripe_global" &&
    currentOffer?.currency === "brl";
  const isCrypto = tokenSymbol && priceValue && !currentOffer;

  const renderGivingFees = () => {
    if (!cardGivingFees) return null;

    return (
      <>
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
        {hasAdditionalTaxes && (
          <Text style={S.infoText}>{t("additionalFeesText")}</Text>
        )}
      </>
    );
  };

  return (
    <View style={S.container}>
      <View style={S.offer}>
        <Text style={S.offerPrice}>{price}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onEditClick}
            style={S.editButton}
          >
            <EditIcon />
          </TouchableOpacity>
        </View>
      </View>
      {!isCrypto && renderGivingFees()}
    </View>
  );
}

export default PriceSelection;
