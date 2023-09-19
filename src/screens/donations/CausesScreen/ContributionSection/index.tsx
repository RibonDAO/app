import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import { useImpactConversion } from "hooks/useImpactConversion";
import S from "./styles";
import ContributionCard from "./ContributionCard";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { nonProfit, contribution } = useImpactConversion();

  return (
    <>
      <View style={S.container}>
        <Text style={S.title}>
          {t("title", {
            nonProfitName: nonProfit?.name,
          })}
        </Text>
        <Image
          style={S.image}
          source={{ uri: contribution?.image }}
          accessibilityIgnoresInvertColors
        />
        <ContributionCard
          from="donateTickets_page"
          customStyle={{ width: "110%", left: -16 }}
        />
      </View>
      <Text style={S.nonProfitTitle}>{t("nonProfits")}</Text>
    </>
  );
}
