import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { useCauses, useNonProfits } from "@ribon.io/shared/hooks";
import { Cause, Offer, NonProfit } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import { useNavigation } from "hooks/useNavigation";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/GroupButtons";
import { FlatList, Text, View } from "react-native";
import NonProfitCard from "screens/promoters/SupportNonProfitScreen/CardScreen/NonProfitCard";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import S from "../styles";

function CardScreen(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();
  const { nonProfits } = useNonProfits();
  const { causes } = useCauses();
  const { tertiary } = theme.colors.brand;
  const { scrollEnabled } = useScrollEnabled();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    logEvent("nonProfitSupportScreen_view");
  }, []);

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(causesFilter()[0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("nonProfitCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const handleDonateClick = (nonProfit: NonProfit) => {
    setFlow("nonProfit");
    logEvent("nonProfitComCicleBtn_click");
    navigateTo("PaymentScreen", {
      offer: currentOffer,
      flow: "nonProfit",
      cause,
      nonProfit,
    });
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
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
          elements={causesFilter()}
          onChange={handleCauseClick}
          indexSelected={0}
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
