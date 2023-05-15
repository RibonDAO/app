import React, { useEffect, useRef, useState } from "react";
import {
  useFreeDonationNonProfits,
  useFreeDonationCauses,
  useCanDonate,
  useStories,
} from "@ribon.io/shared/hooks";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import UserSupportSection from "components/moleculars/UserSupportSection";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { NonProfit, Story } from "@ribon.io/shared/types";
import StoriesSection from "screens/donations/CausesScreen/StoriesSection";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { logError } from "services/crashReport";
import { useTickets } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import Tooltip from "components/atomics/Tooltip";
import TicketSection from "screens/donations/CausesScreen/TicketSection";
import ImpactDonationsVector from "screens/users/ProfileScreen/CommunityDonationsImpactCards/ImpactDonationsVector";
import ZeroDonationsSection from "screens/users/ProfileScreen/ZeroDonationsSection";
import { logEvent } from "services/analytics";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import requestUserPermissionForNotifications from "lib/notifications";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import Placeholder from "./placeholder";
import S from "./styles";

const NOTIFICATION_CARD_VISIBLE_ON_CAUSES_SCREEN_KEY =
  "NOTIFICATION_CARD_VISIBLE_ON_CAUSES_SCREEN_KEY";

export default function CausesScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });
  const { nonProfits, isLoading } = useFreeDonationNonProfits();
  const { causes } = useFreeDonationCauses();
  const {
    canDonate,
    isLoading: loadingCanDonate,
    refetch: refetchCanDonate,
  } = useCanDonate(RIBON_INTEGRATION_ID, PLATFORM);
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
  const [isNotificationCardVisible, setNotificationCardVisible] =
    useState(false);

  useEffect(() => {
    logEvent("P1_view");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  useEffect(() => {
    const notificationCardVisible = async () => {
      const value = await getLocalStorageItem(
        NOTIFICATION_CARD_VISIBLE_ON_CAUSES_SCREEN_KEY,
      );
      return value === "true" || value === null;
    };

    notificationCardVisible().then((visible) => {
      setNotificationCardVisible(visible);
    });
  }, []);

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

  const nonProfitStylesFor = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === nonProfitsFilter().length - 1;

    return {
      marginLeft: isFirst ? 16 : 4,
      marginRight: isLast ? 16 : 4,
      ...S.causesCardContainer,
    };
  };

  const navigateToPromotersScreen = () => {
    navigateTo("PromotersScreen");
  };

  const handleHideNotificationClick = () => {
    setLocalStorageItem(
      NOTIFICATION_CARD_VISIBLE_ON_CAUSES_SCREEN_KEY,
      "false",
    );
    setNotificationCardVisible(false);
    requestUserPermissionForNotifications();
  };

  return isLoading || loadingCanDonate ? (
    <Placeholder />
  ) : (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <View style={S.containerPadding}>
        {currentNonProfit && (
          <StoriesSection
            stories={stories}
            nonProfit={currentNonProfit}
            storiesVisible={storiesVisible}
            setStoriesVisible={setStoriesVisible}
          />
        )}
        <TicketSection canDonate={canDonate} />
        {isNotificationCardVisible && (
          <View style={S.notificationWrapper}>
            <InlineNotification
              title={t("enableNotification.title")}
              type="warning"
              customIcon="notifications"
              firstLink={t("enableNotification.link") || ""}
              onFirstLinkClick={handleHideNotificationClick}
            />
          </View>
        )}

        <Text style={S.title}>{t("title")}</Text>
        <View style={S.groupButtonsContainer}>
          <GroupButtons
            elements={causesFilter()}
            onChange={handleCauseChange}
            nameExtractor={(cause) => cause.name}
          />
        </View>
      </View>

      {nonProfitsFilter()?.length > 0 ? (
        <ScrollView
          style={S.causesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {nonProfitsFilter()?.map((nonProfit, index) => (
            <View style={nonProfitStylesFor(index)} key={nonProfit.id}>
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
                  logEvent("donateTicketBtn_start", {
                    nonProfitId: nonProfit.id,
                    from: "nonprofitCard",
                  });
                  navigateTo("DonateScreen", { nonProfit });
                }}
                buttonDisabled={!hasTickets()}
                labelText={t("labelText") || ""}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={S.noCausesContainer}>
          <ZeroDonationsSection
            title={t("noCauses.title")}
            onButtonPress={navigateToPromotersScreen}
            description={t("noCauses.text")}
            buttonText={t("noCauses.button")}
            image={<ImpactDonationsVector />}
          />
        </View>
      )}

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

      <View style={S.supportContainer}>
        <UserSupportSection />
      </View>
    </ScrollView>
  );
}
