import { View } from "components/Themed";
import { useState } from "react";
import S from "./styles";
import ImpactCard from "../ImpactCard";

function ImpactCards(): JSX.Element {
  const [impacts] = useState([
    { name: "Donated tickets", impact: 200, iconName: "confirmation_number" },
    { name: "Donated money", impact: 300, iconName: "monetization_on" },
    { name: "Supported NGOs", impact: 400, iconName: "diversity_4" },
    { name: "Supporter causes", impact: 500, iconName: "interests" },
  ]);

  const renderItem = ({
    name,
    impact,
    iconName,
  }: {
    name: string;
    impact: number;
    iconName: string;
  }) => (
    <ImpactCard
      key={name}
      onPress={() => {}}
      description={name}
      impact={impact}
      iconName={iconName}
    />
  );

  return (
    <View style={S.cardsContainer}>
      {impacts.map((badge) => renderItem(badge))}
    </View>
  );
}

export default ImpactCards;
