import CardWaveImage from "components/moleculars/CardWaveImage";
import SelectOfferSection from "screens/promoters/SupportNonProfitScreen/CardScreen/SelectOfferSection";
import { View } from "react-native";
import { NonProfit, Offer } from "@ribon.io/shared/types";
import { useNonProfitImpact } from "@ribon.io/shared/hooks";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import S from "../../styles";

type Props = {
  nonProfit: NonProfit;
  handleOfferChange: (offer: Offer) => void;
  currentOffer?: Offer;
  setCurrentOffer: (offer: Offer) => void;
  currentOfferIndex: number;
  setCurrentOfferIndex: (index: number) => void;
  handleDonateClick: (nonProfit: NonProfit) => void;
};
export default function NonProfitCard({
  nonProfit,
  handleOfferChange,
  currentOffer,
  setCurrentOffer,
  currentOfferIndex,
  setCurrentOfferIndex,
  handleDonateClick,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  const { currentCoin } = useCheckoutContext();
  const { formattedImpactText } = useFormattedImpactText();
  const { nonProfitImpact } = useNonProfitImpact(
    nonProfit?.id,
    currentOffer?.priceValue,
    currentCoin,
  );

  return (
    <View style={S.cardWaveContainer}>
      <CardWaveImage
        title={nonProfit.name}
        subtitle={formattedImpactText(
          nonProfit,
          undefined,
          true,
          true,
          nonProfitImpact,
        )}
        image={nonProfit.mainImage}
        buttonText={t("donateButtonText", {
          value: currentOffer?.price,
        })}
        onButtonClick={() => handleDonateClick(nonProfit)}
      >
        <SelectOfferSection
          onOfferChange={handleOfferChange}
          currentOffer={currentOffer}
          setCurrentOffer={setCurrentOffer}
          currentOfferIndex={currentOfferIndex}
          setCurrentOfferIndex={setCurrentOfferIndex}
        />
      </CardWaveImage>
    </View>
  );
}
