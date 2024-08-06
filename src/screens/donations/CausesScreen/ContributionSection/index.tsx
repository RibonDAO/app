import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import CardCampaign from "components/moleculars/CardCampaign";
import S from "./styles";

export default function ContributionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });
  const CURRENT_CARD_ID = 2;

  return (
    <View style={S.container}>
      <Text style={S.title}>{t("titleHead")}</Text>
      <CardCampaign cardId={CURRENT_CARD_ID} />
    </View>
  );
}
