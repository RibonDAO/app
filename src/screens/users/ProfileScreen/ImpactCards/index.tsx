import { View } from "components/Themed";
import S from "./styles";
import { useCallback } from "react";
import ImpactCard from "../ImpactCard";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";

function ImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({ userId: currentUser?.id });

  const impacts = useCallback(() =>
    [
      { name: "Donated tickets", impact: userStatistics?.totalTickets ?? 0, iconName: "confirmation_number" },
      { name: "Donated money", impact: userStatistics?.totalDonated?.brl ?? 0, iconName: "monetization_on" },
      { name: "Supported NGOs", impact: userStatistics?.totalNonProfits ?? 0, iconName: "diversity_4" },
      { name: "Supporter causes", impact: userStatistics?.totalCauses ?? 0, iconName: "interests" }
    ], [userStatistics]);

  const renderItem = ({ name, impact, iconName }: { name: string, impact: number, iconName: string }) => (
    <ImpactCard
      key={name}
      onPress={() => { }}
      description={name}
      impact={impact}
      iconName={iconName}
    />
  );

  return (
    <View style={S.cardsContainer}>
      {impacts().map((impact) => renderItem(impact))}
    </View>
  );
}

export default ImpactCards;
