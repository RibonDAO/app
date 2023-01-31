import { View } from "components/Themed";
import S from "./styles";
import { useState } from "react";
import ImpactCard from "../ImpactCard";

function ImpactCards(): JSX.Element {
  const [impacts] = useState([
    { name: "Donated tickets", impact: 200 },
    { name: "Donated money", impact: 300 },
    { name: "Supported NGOs", impact: 400 },
    { name: "Supporter causes", impact: 500 }
  ]);

  const renderItem = ({ name, impact }: { name: string, impact: number }) => (
    <ImpactCard
      onPress={() => { }}
      description={name}
      impact={impact}
    />
  );

  return (
    <View style={S.cardsContainer}>
      {impacts.map((badge) => renderItem(badge))}
    </View>
  );
}

export default ImpactCards;
