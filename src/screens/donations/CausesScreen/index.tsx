import React, { useEffect, useState } from "react";
import { useNonProfits, useCauses } from "@ribon.io/shared/hooks";
import { ScrollView } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "components/Themed";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import { createIconSet } from "@expo/vector-icons";
import glyphMap from "./rounded.ttf";
import S from "./styles";

export default function CausesScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });
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
      <Text style={S.title}>{t("title")}</Text>
      <View style={S.groupButtonsContainer}>
        <GroupButtons
          elements={causesFilter()}
          onChange={handleCauseChange}
          nameExtractor={(cause) => cause.name}
        />
      </View>

      <ScrollView
        style={S.causesContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {nonProfitsFilter()?.map((nonProfit, idx) => (
          <View style={S.causesCardContainer} key={idx.toString()}>
            <CardCenterImageButton
              image={nonProfit.mainImage}
              infoTextLeft={nonProfit.name}
              infoTextRight={nonProfit.cause.name}
              imageDescription={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
              buttonText={t("buttonText")}
              onClickButton={() => {
                navigateTo("DonateScreen", { nonProfit });
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
