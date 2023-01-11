import React, { useState } from "react";
import { useNonProfits, useCauses } from "@ribon.io/shared/hooks";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import S from "./styles";
import GroupButtons from "components/moleculars/GroupButtons";
import { Text, View } from "components/Themed";
import { ScrollView } from "react-native";
import { useNavigation } from "hooks/useNavigation";

export default function CausesScreen() {
  const { nonProfits, isLoading } = useNonProfits();
  const { causes } = useCauses();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { navigateTo } = useNavigation();

  const causesFilter = () => {
    const causesApi = causes.filter((cause) => cause.active);
    return causesApi || [];
  };

  const handleCauseChange = (_element: any, index: number) => {
    setSelectedButtonIndex(index);
  };

  const nonProfitsFilter = () => {
    const nonProfitsFiltered = nonProfits?.filter(
      (nonProfit) =>
        nonProfit?.cause?.id === causesFilter()[selectedButtonIndex]?.id,
    );

    return nonProfitsFiltered || [];
  };

  return isLoading ? (
    <></>
  ) : (
    <View style={S.container}>
      <Text style={S.title}>Donate to a project</Text>
      <View style={S.groupButtonsContainer}>
        <GroupButtons
          elements={causesFilter()}
          onChange={handleCauseChange}
          nameExtractor={(cause) => cause.name}
        />
      </View>
      <ScrollView
        style={S.causesContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {nonProfitsFilter()?.map((nonProfit, idx) => (
          <View style={S.causesCardContainer} key={idx.toString()}>
            <CardCenterImageButton
              image={nonProfit.mainImage}
              infoTextLeft={nonProfit.name}
              infoTextRight={nonProfit.cause.name}
              imageDescription={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
              buttonText="Donate"
              onClickButton={() => {
                navigateTo("DonateModal", { nonProfit });
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
