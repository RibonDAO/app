import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useStories,
  useFirstAccessToIntegration,
  useDonatedToday,
} from "@ribon.io/shared/hooks";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { NonProfit, Story } from "@ribon.io/shared/types";
import StoriesSection from "screens/donations/CausesScreen/StoriesSection";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { logError } from "services/crashReport";
import { useTicketsContext } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import Tooltip from "components/atomics/Tooltip";
import ImpactDonationsVector from "screens/users/ImpactScreen/CommunityDonationsImpactCards/ImpactDonationsVector";
import ZeroDonationsSection from "screens/users/ImpactScreen/ZeroDonationsSection";
import { logEvent } from "services/analytics";
import { Image } from "expo-image";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import requestUserPermissionForNotifications from "lib/notifications";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { showToast } from "lib/Toast";
import { useFocusEffect } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { perform } from "lib/timeoutHelpers";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import IntegrationBanner from "components/moleculars/IntegrationBanner";
import usePageView from "hooks/usePageView";
import { useCausesContext } from "contexts/causesContext";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCauseDonationContext } from "contexts/causesDonationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets } from "hooks/useTickets";
import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";
import { useRouteParams } from "hooks/useRouteParams";
import Placeholder from "./placeholder";
import S from "./styles";
import ContributionSection from "./ContributionSection";
import DonationErrorModal from "./errorModalSection";

const NOTIFICATION_CARD_VISIBLE_KEY = "NOTIFICATION_CARD_VISIBLE";

export default function CausesScreen() {
  usePageView("P26_view");
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });
  const { nonProfitsWithPoolBalance: nonProfits, isLoading } =
    useNonProfitsContext();
  const { causesWithPoolBalance: causes } = useCausesContext();
  const { chosenCause, setChosenCauseIndex, setChosenCause, chosenCauseIndex } =
    useCauseDonationContext();
  const { currentIntegrationId, externalId } = useIntegrationContext();

  const { donatedToday } = useDonatedToday();
  const {
    isFirstAccessToIntegration,
    refetch: refetchFirstAccessToIntegration,
    isLoading: loadingFirstAccessToIntegration,
  } = useFirstAccessToIntegration(currentIntegrationId);
  const { integration } = useIntegrationContext();
  const { ticketsCounter } = useTicketsContext();
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>(
    {} as NonProfit,
  );
  const [isNotificationCardVisible, setNotificationCardVisible] =
    useState(false);
  const { navigateTo } = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const { fetchNonProfitStories } = useStories();
  const { formattedImpactText } = useFormattedImpactText();
  const { hasTickets, refetchTickets } = useTicketsContext();
  const { currentUser, signedIn } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect, handleCollect } =
    useTickets();
  const { params } = useRouteParams<"CausesScreen">();

  useEffect(() => {
    if (!isLoading) perform(SplashScreen.hideAsync).in(100);
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      refetchTickets();
      refetchFirstAccessToIntegration();
    }, [
      currentUser,
      signedIn,
      ticketsCounter,
      currentIntegrationId,
      isFirstAccessToIntegration,
    ]),
  );

  async function receiveTicket() {
    const canCollect = await handleCanCollect();
    const receivedTicketToday = await hasReceivedTicketToday();
    if (canCollect) {
      if (currentUser) {
        await handleCollect();
        refetchTickets();
      }
      if (!receivedTicketToday) {
        showToast({
          type: "custom",
          message: t("ticketToast"),
          position: "bottom",
          navigate: "GiveTicketScreen",
          icon: "confirmation_number",
          backgroundColor: theme.colors.brand.primary[50],
          iconColor: theme.colors.brand.primary[600],
          borderColor: theme.colors.brand.primary[600],
          textColor: theme.colors.brand.primary[600],
        });
        await setLocalStorageItem(
          DONATION_TOAST_SEEN_AT_KEY,
          Date.now().toString(),
        );
        await setLocalStorageItem(
          DONATION_TOAST_INTEGRATION,
          currentIntegrationId?.toLocaleString(),
        );
      }
    } else {
      refetchTickets();
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (isFirstAccessToIntegration !== undefined) {
        receiveTicket();
      }
    }, [isFirstAccessToIntegration, externalId]),
  );

  useEffect(() => {
    const notificationCardVisible = async () => {
      const value = await getLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY);
      return value === "true" || value === null;
    };

    notificationCardVisible().then((visible) => {
      setNotificationCardVisible(visible);
    });
  }, []);

  const causesFilter = () => {
    const causesApi = causes.filter((cause) => cause.status === "active");
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

  const handleCauseChange = useCallback((_element: any, index: number) => {
    const cause = _element;
    setChosenCauseIndex(index);
    if (cause.id !== 0) {
      setChosenCause(cause);
    } else {
      setChosenCause(undefined);
    }

    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, []);

  const nonProfitsFilter = useCallback(() => {
    if (chosenCause) {
      const nonProfitsFiltered = nonProfits?.filter(
        (nonProfit) => nonProfit?.cause?.id === chosenCause?.id,
      );

      return nonProfitsFiltered || [];
    }
    return nonProfits || [];
  }, [chosenCause, nonProfits]);

  const sortNonProfits = useCallback(() => {
    const filteredNonProfits = nonProfitsFilter();
    const sorted = [...filteredNonProfits].sort((a, b) => {
      const causeAIndex = causes.findIndex((cause) => cause.id === a.cause.id);
      const causeBIndex = causes.findIndex((cause) => cause.id === b.cause.id);

      return causeAIndex - causeBIndex;
    });
    return sorted;
  }, [nonProfitsFilter, causes]);

  useEffect(() => {
    sortNonProfits();
  }, [chosenCause]);

  const handleNonProfitImagePress = async (nonProfit: NonProfit) => {
    setCurrentNonProfit(nonProfit);
    try {
      const nonProfitStories = await fetchNonProfitStories(nonProfit.id);
      Image.prefetch(nonProfitStories.map((story) => story.image));
      if (nonProfitStories.length === 0) return;
      setStories(nonProfitStories);
      setStoriesVisible(true);
      logEvent("storiesBtn_click", {
        nonProfitId: nonProfit.id,
        from: "NGOCard",
      });
    } catch (e) {
      logError(e);
    }
  };

  const nonProfitStylesFor = useCallback(
    (index: number) => {
      const filteredNonProfits = nonProfitsFilter();
      const isFirst = index === 0;
      const isLast = index === filteredNonProfits.length - 1;

      return {
        marginLeft: isFirst ? 16 : 4,
        marginRight: isLast ? 16 : 4,
        ...S.causesCardContainer,
      };
    },
    [nonProfitsFilter],
  );

  const navigateToPromotersScreen = useCallback(() => {
    navigateTo("PromotersScreen");
  }, []);

  const shouldShowIntegrationBanner =
    !integration?.name?.toLowerCase()?.includes("ribon") &&
    integration &&
    !donatedToday &&
    hasTickets &&
    integration?.uniqueAddress !== INTEGRATION_AUTH_ID;

  const handleHideNotificationClick = async () => {
    const hideAlert = () => {
      setLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY, "false");
      setNotificationCardVisible(false);
    };

    try {
      const enabled = await requestUserPermissionForNotifications();
      if (enabled) {
        showToast({
          type: "success",
          message: t("enableNotification.successToastMessage"),
          position: "bottom",
        });
        hideAlert();
      }
    } catch (e) {
      logError(e);
      showToast({
        type: "error",
        message: t("enableNotification.errorToastMessage"),
        position: "bottom",
      });
      hideAlert();
    }
  };

  const renderNotificationCard = useCallback(() => (
      isNotificationCardVisible && (
        <View style={{ paddingBottom: 16 }}>
          <InlineNotification
            title={t("enableNotification.title")}
            type="warning"
            customIcon="notifications"
            firstLink={t("enableNotification.link") || ""}
            onFirstLinkClick={handleHideNotificationClick}
          />
        </View>
      )
    ), [isNotificationCardVisible]);

  const handleButtonPress = (nonProfit: NonProfit) => {
    logEvent("donateTicketBtn_start", {
      nonProfitId: nonProfit.id,
      from: "nonprofitCard",
    });
    if (signedIn) {
      navigateTo("SelectTicketsScreen", {
        nonProfit,
        cause: nonProfit.cause,
      });
    } else {
      navigateTo("DonationSignInScreen", { nonProfit });
    }
  };

  return isLoading || loadingFirstAccessToIntegration ? (
    <Placeholder />
  ) : (
    <>
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

          {renderNotificationCard()}
          {shouldShowIntegrationBanner && (
            <IntegrationBanner integration={integration} />
          )}
          {donatedToday && currentUser ? (
            <ContributionSection />
          ) : (
            <Text style={S.title}>{t("title")}</Text>
          )}

          <ScrollView
            style={S.groupButtonsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <GroupButtons
              elements={causesFilter()}
              onChange={handleCauseChange}
              nameExtractor={(cause) => cause.name}
              indexSelected={chosenCauseIndex}
            />
          </ScrollView>
        </View>

        {sortNonProfits()?.length > 0 ? (
          <ScrollView
            style={S.causesContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {sortNonProfits()?.map((nonProfit, index) => (
              <View style={nonProfitStylesFor(index)} key={nonProfit.id}>
                <CardCenterImageButton
                  image={nonProfit.mainImage}
                  infoTextTop={nonProfit.name}
                  infoTextBottom={nonProfit.cause.name}
                  imageDescription={formattedImpactText(
                    nonProfit,
                    undefined,
                    false,
                    false,
                    undefined,
                    t("impactPrefix") || "",
                  )}
                  buttonText={hasTickets ? t("buttonText") : t("noTickets")}
                  onImagePress={() => {
                    handleNonProfitImagePress(nonProfit);
                  }}
                  onClickButton={() => handleButtonPress(nonProfit)}
                  buttonDisabled={!hasTickets}
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
          <UserSupportBanner from="donateTickets_page" />
        </View>
      </ScrollView>
      <DonationErrorModal newState={params?.newState} />
    </>
  );
}
