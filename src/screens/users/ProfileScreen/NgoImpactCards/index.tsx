import { View } from "components/Themed";
import S from "./styles";
import { useState } from "react";
import NgoImpactCard from "../NgoImpactCard";

function NgoImpactCards(): JSX.Element {
  const [ngoImpacts] = useState([
    { name: "Evidence Action", impact: "Você doou 3 dias de água tratada para uma pessoa" },
    { name: "Donated money", impact: "Você doou 3 dias de água tratada para uma pessoa" },
    { name: "Supported NGOs", impact: "Você doou 3 dias de água tratada para uma pessoa" },
    { name: "Supporter causes", impact: "Você doou 3 dias de água tratada para uma pessoa" }
  ]);

  const renderItem = ({ name, impact }: { name: string, impact: string }) => (
    <NgoImpactCard
      onPress={() => { }}
      description={impact}
      impact={name}
    />
  );

  return (
    <View style={S.cardsContainer}>
      {ngoImpacts.map((badge) => renderItem(badge))}
    </View>
  );
}

export default NgoImpactCards;
