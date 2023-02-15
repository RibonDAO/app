import { FlatList, Text, View } from "react-native";
import { ReactElement, useCallback } from "react";
import { useImpact } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import NgoImpactCard from "../NgoImpactCard";
import S from "./styles";
import ZeroDonationsSection from "./ZeroDonationsSection";

function NgoImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);

  const impactItems = useCallback(
    () => userImpact?.filter((item) => item.impact.toString() !== "0"),
    [userImpact],
  );
  const hasImpact = impactItems() && impactItems().length > 0;

  const renderItem = ({ item }: { item: any }): ReactElement<any, any> => (
    <NgoImpactCard
      key={item?.nonProfit.id}
      description={`${item.impact} de ${item.nonProfit.impactDescription} para ${item.nonProfit.name}`}
      name={item?.nonProfit.name}
      icon={item?.nonProfit.logo}
      onPress={() => {}}
    />
  );

  const impactCardsList = () => (
    <FlatList
      data={impactItems()}
      renderItem={renderItem}
      keyExtractor={(index) => index.toString()}
      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
    />
  );

  return (
    <View style={S.cardsContainer}>
      {hasImpact ? impactCardsList() : <ZeroDonationsSection />}
    </View>
  );
}

export default NgoImpactCards;
