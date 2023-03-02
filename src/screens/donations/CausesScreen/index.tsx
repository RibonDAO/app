import React, { useEffect, useRef, useState } from "react";
import {
  useNonProfits,
  useCauses,
  useCanDonate,
  useStories,
} from "@ribon.io/shared/hooks";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import UserSupportSection from "components/moleculars/UserSupportSection";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "services/analytics";
import { NonProfit, Story } from "@ribon.io/shared/types";
import StoriesSection from "screens/donations/CausesScreen/StoriesSection";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { logError } from "services/crashReport";
import { useTickets } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import Tooltip from "components/atomics/Tooltip";
import TicketSection from "screens/donations/CausesScreen/TicketSection";
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
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>(
    {} as NonProfit,
  );
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const scrollViewRef = useRef<any>(null);
  const { fetchNonProfitStories } = useStories();
  const { formattedImpactText } = useFormattedImpactText();
  const { hasTickets } = useTickets();

  useEffect(() => {
    logEvent("app_causes_page_view");
  }, [logEvent]);

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  const causesFilter = () => {
    const causesApi = causes.filter((cause) => cause.active);
    return (
      [
        {
          id: 0,
          name: t("allCauses"),
        },
        ...causesApi,
      ] || []
    );
  };

  const handleCauseChange = (_element: any, index: number) => {
    setSelectedButtonIndex(index);

    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  const nonProfitsFilter = () => {
    if (selectedButtonIndex === 0) return nonProfits || [];

    const nonProfitsFiltered = nonProfits?.filter(
      (nonProfit) =>
        nonProfit?.cause?.id === causesFilter()[selectedButtonIndex]?.id,
    );

    return nonProfitsFiltered || [];
  };

  const handleNonProfitImagePress = async (nonProfit: NonProfit) => {
    setCurrentNonProfit(nonProfit);
    try {
      const nonProfitStories = await fetchNonProfitStories(nonProfit.id);
      if (nonProfitStories.length === 0) return;
      setStories(nonProfitStories);
      setStoriesVisible(true);
    } catch (e) {
      logError(e);
    }
  };

  return isLoading || loadingCanDonate ? (
    <Placeholder />
  ) : (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <View style={S.containerPadding}>
        <StoriesSection
          stories={stories}
          nonProfit={currentNonProfit}
          storiesVisible={storiesVisible}
          setStoriesVisible={setStoriesVisible}
        />
        <TicketSection canDonate={canDonate} />
        <Text style={S.title}>{t("title")}</Text>
        <View style={S.groupButtonsContainer}>
          <GroupButtons
            elements={causesFilter()}
            onChange={handleCauseChange}
            nameExtractor={(cause) => cause.name}
          />
        </View>
      </View>

      <ScrollView
        style={S.causesContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {nonProfitsFilter()?.map((nonProfit) => (
          <View style={S.causesCardContainer} key={nonProfit.id}>
            <CardCenterImageButton
              image={nonProfit.mainImage}
              infoTextLeft={nonProfit.name}
              infoTextRight={nonProfit.cause.name}
              imageDescription={formattedImpactText(
                nonProfit,
                undefined,
                false,
                false,
                undefined,
                t("impactPrefix") || "",
              )}
              buttonText={t("buttonText")}
              onImagePress={() => {
                handleNonProfitImagePress(nonProfit);
              }}
              onClickButton={() => {
                navigateTo("DonateScreen", { nonProfit });
              }}
              buttonDisabled={!hasTickets()}
              labelText={t("labelText") || ""}
            />
          </View>
        ))}
      </ScrollView>

      <Tooltip tooltipText={t("ticketExplanation")}>
        <View style={S.ticketExplanationSection}>
          <Icon
            type="rounded"
            name="help"
            size={20}
            color={theme.colors.gray30}
          />
          <View style={{ overflow: "hidden" }}>
            <View style={S.ticketTextContainer}>
              <Text style={S.ticketText}>{t("whatIsATicket")}</Text>
            </View>
          </View>
        </View>
      </Tooltip>

      <View style={S.containerPadding}>
        <UserSupportSection />
      </View>

    </ScrollView>
  );
}
