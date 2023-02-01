import { View } from "components/Themed";
import S from "./styles";
import { useCallback, useEffect } from "react";
import NgoImpactCard from "../NgoImpactCard";
import { useImpact } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { Impact } from "@ribon.io/shared/types";

function NgoImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);

  const impactItems = useCallback(() => userImpact?.filter(
    (item) => item.impact.toString() !== "0",
  ), [userImpact]);

  return (
    <View style={S.cardsContainer}>
      {impactItems()?.map((item: Impact) => (
        <NgoImpactCard
          key={item?.nonProfit.id}
          description={`${item.impact} de ${item.nonProfit.impactDescription} para ${item.nonProfit.name}`}
          name={item?.nonProfit.name}
          icon={item?.nonProfit.logo}
          onPress={() => { }}
        />
      ))}
    </View>
  );
}

export default NgoImpactCards;
