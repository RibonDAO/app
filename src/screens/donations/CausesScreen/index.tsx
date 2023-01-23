import React, { useState } from "react";
import { useNonProfits, useCauses, useCanDonate } from "@ribon.io/shared/hooks";
import { ScrollView } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "components/Themed";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import S from "./styles";
import TicketModal from "./TicketModal";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export default function CausesScreen() {
  const { nonProfits, isLoading } = useNonProfits();
  const { causes } = useCauses();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [ticketModalVisible, setTicketModalVisible] = useState(true);
  const { navigateTo } = useNavigation();
  const { canDonate } = useCanDonate(RIBON_INTEGRATION_ID);
  const { t } = useTranslation();

  function renderTicketModal() {
    return canDonate && <TicketModal
      visible={ticketModalVisible}
      setVisible={setTicketModalVisible}
    />
  }

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
      <Text style={S.title}>{t("donations.causesScreen.title")}</Text>
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

      {renderTicketModal()}
    </View>
  );
}
