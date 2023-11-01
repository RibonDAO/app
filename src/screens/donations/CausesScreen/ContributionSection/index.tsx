import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import CardCampaign from "components/moleculars/CardCampaign";
import { ImpressionCard, useImpressionCards } from "@ribon.io/shared";
import { logError } from "services/crashReport";
import S from "./styles";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const CURRENT_CARD_ID = 2;

  const { nonProfit } = useImpactConversion();
  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = async () => {
    try {
      const impressionCardData = await getImpressionCard(CURRENT_CARD_ID);
      setImpressionCard(impressionCardData);
    } catch (e) {
      logError(e);
    }
  };

  useEffect(() => {
    fetchImpressionCard();
  }, []);

  return impressionCard ? (
    <>
      <View style={S.container}>
        <Text style={S.title}>
          {t("title", {
            nonProfitName: nonProfit?.name,
          })}
        </Text>
        <CardCampaign cardId={CURRENT_CARD_ID} />
      </View>
      <Text style={S.nonProfitTitle}>{t("nonProfits")}</Text>
    </>
  ) : (
    <View />
  );
}
