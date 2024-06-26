import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { Cause, Offer, NonProfit } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import { useNavigation } from "hooks/useNavigation";
import GroupButtons from "components/moleculars/GroupButtons";
import { FlatList, Text, View } from "react-native";
import NonProfitCard from "screens/promoters/SupportNonProfitScreen/CardScreen/NonProfitCard";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCauseContributionContext } from "contexts/causesContributionContext";
import { useCausesContext } from "contexts/causesContext";
import { useCheckoutContext } from "contexts/checkoutContext";
import S from "../styles";

function CardScreen(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setOffer, setFlow } = useCheckoutContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();
  const { nonProfits } = useNonProfitsContext();
  const { causes } = useCausesContext();
  const { tertiary } = theme.colors.brand;
  const { scrollEnabled } = useScrollEnabled();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    setCause(chosenCause);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCauseIndex(index);
    setChosenCause(causeClicked);
  };

  const handleDonateClick = (nonProfit: NonProfit) => {
    setFlow("nonProfit");
    logEvent("giveNgoBtn_start", {
      from: "giveNonProfit_page",
      nonprofitId: nonProfit.id,
      price: currentOffer?.priceValue,
      currency: currentOffer?.currency,
    });
    navigateTo("RecurrenceScreen", {
      target: "non_profit",
      targetId: nonProfit?.id,
      offer: currentOffer?.priceCents,
      currency: currentOffer?.currency,
    });
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOffer(offer);
  };

  const filteredNonProfits = useCallback(
    () =>
      nonProfits?.filter((nonProfit) => nonProfit.cause.id === cause?.id) || [],
    [cause, nonProfits],
  );

  return (
    <View style={S.Container}>
      <View style={S.TitleContainer}>
        <Text style={S.Title}>{t("title")}</Text>

        <GroupButtons
          elements={causes}
          onChange={handleCauseClick}
          indexSelected={chosenCauseIndex}
          nameExtractor={(element) => element.name}
          backgroundColor={tertiary[800]}
          textColorOutline={tertiary[800]}
          borderColor={tertiary[800]}
          borderColorOutline={tertiary[200]}
        />
      </View>

      <FlatList
        renderItem={({ item: nonProfit }) => (
          <NonProfitCard
            nonProfit={nonProfit}
            handleOfferChange={handleOfferChange}
            currentOffer={currentOffer}
            setCurrentOffer={setCurrentOffer}
            currentOfferIndex={currentOfferIndex}
            setCurrentOfferIndex={setCurrentOfferIndex}
            handleDonateClick={handleDonateClick}
          />
        )}
        data={filteredNonProfits()}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        contentContainerStyle={S.scrollContainer}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
      />
    </View>
  );
}

export default CardScreen;
