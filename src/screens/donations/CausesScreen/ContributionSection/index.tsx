import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import CardCampaign from "components/moleculars/CardCampaign";
import S from "./styles";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const CURRENT_CARD_ID = 2;

  const { nonProfit } = useImpactConversion();

  return (
    <View style={S.container}>
        <Text style={S.title}>
          {t("title", {
            nonProfitName: nonProfit?.name,
          })}
        </Text>
        <CardCampaign cardId={CURRENT_CARD_ID} />
      </View>
  );
}
