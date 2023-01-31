import React, { useEffect, useState } from "react";
import { useNonProfits, useCauses, useCanDonate } from "@ribon.io/shared/hooks";
import { ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "components/Themed";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import BlankModal from "components/moleculars/modals/BlankModal";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import S from "./styles";
import Placeholder from "./placeholder";

export default function CausesScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });
  const { nonProfits, isLoading } = useNonProfits();
  const { causes } = useCauses();
  const {
    canDonate,
    isLoading: loadingCanDonate,
    refetch: refetchCanDonate,
  } = useCanDonate(RIBON_INTEGRATION_ID);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [ticketModalVisible, setTicketModalVisible] = useState(canDonate);
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setTicketModalVisible(canDonate);
  }, [canDonate]);

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 200);
  }, [JSON.stringify(currentUser)]);

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

  return isLoading || loadingCanDonate ? (
    <Placeholder />
  ) : (
    <View style={S.container}>
      <BlankModal
        visible={ticketModalVisible}
        setVisible={setTicketModalVisible}
        containerStyle={S.containerTicket}
      >
        <ReceiveTicketScreen
          onTicketReceived={() => {
            setTicketModalVisible(false);
          }}
        />
      </BlankModal>
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
        {nonProfitsFilter()?.map((nonProfit) => (
          <View style={S.causesCardContainer} key={nonProfit.id}>
            <CardCenterImageButton
              image={nonProfit.mainImage}
              infoTextLeft={nonProfit.name}
              infoTextRight={nonProfit.cause.name}
              imageDescription={`${nonProfit.impactByTicket} ${nonProfit.impactDescription}`}
              buttonText={t("buttonText")}
              onClickButton={() => {
                navigateTo("DonateScreen", { nonProfit });
              }}
              buttonDisabled={!canDonate}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
