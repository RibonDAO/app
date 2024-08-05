import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import CardCampaign from "components/moleculars/CardCampaign";
import S from "./styles";

export default function FeelingBanner() {
  const { t } = useTranslation("translation", {
    keyPrefix: "feelingBanner",
  });
  const CURRENT_CARD_ID = 1;

  return (
    <View style={S.container}>
      <Text style={S.title}>{t("titleHead")}</Text>
      <CardCampaign cardId={CURRENT_CARD_ID} />
    </View>
  );
}
