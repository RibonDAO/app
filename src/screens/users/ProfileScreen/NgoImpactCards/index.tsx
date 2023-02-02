import { View } from "react-native";
import { useCallback, useEffect } from "react";
import { useImpact } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { Impact } from "@ribon.io/shared/types";
import NgoImpactCard from "../NgoImpactCard";
import S from "./styles";

function NgoImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);

  const impactItems = useCallback(
    () => userImpact?.filter((item) => item.impact.toString() !== "0"),
    [userImpact],
  );

  return (
    <View style={S.cardsContainer}>
      {impactItems()?.map((item: Impact) => (
        <NgoImpactCard
          key={item?.nonProfit.id}
          description={`${item.impact} de ${item.nonProfit.impactDescription} para ${item.nonProfit.name}`}
          name={item?.nonProfit.name}
          icon={item?.nonProfit.logo}
          onPress={() => {}}
        />
      ))}
    </View>
  );
}

export default NgoImpactCards;
