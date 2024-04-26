import { useCallback, useEffect, useRef } from "react";
import {
  useFirstAccessToIntegration,
  useDonatedToday,
} from "@ribon.io/shared/hooks";
import { ScrollView, View, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import GroupButtons from "components/moleculars/GroupButtons";
import {
  INTEGRATION_AUTH_ID,
  RIBON_INTEGRATION_ID,
} from "utils/constants/Application";
import { useTicketsContext } from "contexts/ticketsContext";
import { logEvent } from "services/analytics";
import { setLocalStorageItem } from "lib/localStorage";
import { showToast } from "lib/Toast";
import { useFocusEffect } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { perform } from "lib/timeoutHelpers";
import usePageView from "hooks/usePageView";
import { useCausesContext } from "contexts/causesContext";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCauseDonationContext } from "contexts/causesDonationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets } from "hooks/useTickets";
import { useIsOnboarding } from "contexts/onboardingContext";
import NewHeader from "components/moleculars/NewHeader";
import { theme } from "@ribon.io/shared/styles";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";

import S from "./styles";

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
  } = useFirstAccessToIntegration(currentIntegrationId);
  const { integration } = useIntegrationContext();
  const { ticketsCounter } = useTicketsContext();

  const { navigateTo } = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const { hasTickets, refetchTickets } = useTicketsContext();
  const { currentUser, signedIn } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect, handleCollect } =
    useTickets();
  const { onboardingCompleted } = useIsOnboarding();

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
    const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;
    if (canCollect) {
      if (currentUser && !receivedTicketToday) {
        if (isRibonIntegration) {
          await handleCollect({
            onSuccess: () => {
              logEvent("ticketCollected", { from: "collect" });
            },
          });
          refetchTickets();
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
            RECEIVED_TICKET_AT_KEY,
            Date.now().toString(),
          );
          await setLocalStorageItem(
            RECEIVED_TICKET_FROM_INTEGRATION,
            currentIntegrationId?.toLocaleString(),
          );
          logEvent("receiveTicket_view", { from: "receivedTickets_toast" });
        } else {
          navigateTo("GiveTicketV2Screen");
        }
      } else if (!currentUser && onboardingCompleted !== true) {
        navigateTo("OnboardingScreen");
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
    }, [
      isFirstAccessToIntegration,
      externalId,
      currentUser,
      onboardingCompleted,
    ]),
  );

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

  const handleCauseChange = (_element: any, index: number) => {
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
  };

  const nonProfitsFilter = () => {
    if (chosenCause) {
      const nonProfitsFiltered = nonProfits?.filter(
        (nonProfit) => nonProfit?.cause?.id === chosenCause?.id,
      );

      return nonProfitsFiltered || [];
    }
    return nonProfits || [];
  };

  const sortNonProfits = () => {
    const filteredNonProfits = nonProfitsFilter();
    const sorted = [...filteredNonProfits].sort((a, b) => {
      const causeAIndex = causes.findIndex((cause) => cause.id === a.cause.id);
      const causeBIndex = causes.findIndex((cause) => cause.id === b.cause.id);

      return causeAIndex - causeBIndex;
    });
    return sorted;
  };

  useEffect(() => {
    sortNonProfits();
  }, [chosenCause]);

  const shouldShowIntegrationBanner =
    !integration?.name?.toLowerCase()?.includes("ribon") &&
    integration &&
    !donatedToday &&
    hasTickets &&
    integration?.uniqueAddress !== INTEGRATION_AUTH_ID;

  const header = () => (
    <>
      <NewHeader />
      <View
        style={[
          S.containerPadding,
          !shouldShowIntegrationBanner && {
            paddingTop: 16,
            borderTopWidth: 1,
          },
        ]}
      >
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
    </>
  );
  const footer = () => <NewHeader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={sortNonProfits()}
        renderItem={({ item }) => (
          <CardCenterImageButton stories={item.stories} />
        )}
        keyExtractor={(nonProfit) => nonProfit.id.toString()}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
}
