import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import CardCampaign from "components/moleculars/CardCampaign";
import S from "./styles";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { nonProfit } = useImpactConversion();

  return (
    <>
      <View style={S.container}>
        <Text style={S.title}>
          {t("title", {
            nonProfitName: nonProfit?.name,
          })}
        </Text>
        <CardCampaign cardId={2} />
      </View>
      <Text style={S.nonProfitTitle}>{t("nonProfits")}</Text>
    </>
  );
}
