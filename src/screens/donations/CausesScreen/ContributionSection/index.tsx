import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import CardCampaign from "components/moleculars/CardCampaign";
import { useImpressionCards } from "@ribon.io/shared";
import S from "./styles";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const CURRENT_CARD_ID = 2;

  const { nonProfit } = useImpactConversion();
  const { getImpressionCard } = useImpressionCards();

  const hasImpressionCard = !!getImpressionCard(CURRENT_CARD_ID);

  return (
    hasImpressionCard && (
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
    )
  );
}
