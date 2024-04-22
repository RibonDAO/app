import { View } from "react-native";
import CardCampaign from "components/moleculars/CardCampaign";
import S from "./styles";

export default function ContributionSection() {
  const CURRENT_CARD_ID = 2;

  return (
    <View style={S.container}>
      <CardCampaign cardId={CURRENT_CARD_ID} />
    </View>
  );
}
