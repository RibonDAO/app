import { useCallback, useEffect, useState } from "react";
import {
  useFirstAccessToIntegration,
  useDonatedToday,
  useSubscriptions,
} from "@ribon.io/shared/hooks";
import { RefreshControl } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import {
  INTEGRATION_AUTH_ID,
  RIBON_INTEGRATION_ID,
} from "utils/constants/Application";
import { logError } from "services/crashReport";
import { useTicketsContext } from "contexts/ticketsContext";
import { logEvent } from "services/analytics";
import { setLocalStorageItem } from "lib/localStorage";
import { showToast } from "lib/Toast";
import { useFocusEffect } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { perform } from "lib/timeoutHelpers";
import IntegrationBanner from "components/moleculars/IntegrationBanner";
import usePageView from "hooks/usePageView";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets } from "hooks/useTickets";
import { useIsOnboarding } from "contexts/onboardingContext";
import { useRouteParams } from "hooks/useRouteParams";
import NewHeader from "components/moleculars/NewHeader";
import { theme } from "@ribon.io/shared/styles";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import Placeholder from "./placeholder";
import ContributionSection from "./ContributionSection";
import DonationErrorModal from "./errorModalSection";
import ClubSection from "./ClubSection";
import ReportsSection from "./ReportsSection";
import NotificationPermissionPrompt from "./NotificationPermissionPrompt";
import CausesSection from "./CausesSection";
import * as S from "./styles";

export default function CausesScreen() {
  usePageView("P26_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { isLoading } = useNonProfitsContext();
  const { currentIntegrationId, externalId } = useIntegrationContext();

  const { donatedToday } = useDonatedToday();
  const {
    isFirstAccessToIntegration,
    refetch: refetchFirstAccessToIntegration,
    isLoading: loadingFirstAccessToIntegration,
  } = useFirstAccessToIntegration(currentIntegrationId);
  const { integration } = useIntegrationContext();
  const { ticketsCounter } = useTicketsContext();

  const [refreshing, setRefreshing] = useState(false);

  const { navigateTo } = useNavigation();
  const { hasTickets, refetchTickets } = useTicketsContext();
  const { currentUser, signedIn } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect, handleCollect } =
    useTickets();
  const { params } = useRouteParams<"CausesScreen">();
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

  const shouldShowIntegrationBanner =
    !integration?.name?.toLowerCase()?.includes("ribon") &&
    integration &&
    !donatedToday &&
    hasTickets &&
    integration?.uniqueAddress !== INTEGRATION_AUTH_ID;

  const { userIsMember } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.allSettled([
        refetchTickets(),
        refetchIsMember(),
        refetchFirstAccessToIntegration(),
      ]);
    } catch (e) {
      logError(e);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading || loadingFirstAccessToIntegration) return <Placeholder />;

  return (
    <S.Container
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <NewHeader />
      <S.ContainerPadding hasPadding={!shouldShowIntegrationBanner}>
        {shouldShowIntegrationBanner && (
          <IntegrationBanner integration={integration} />
        )}
        <NotificationPermissionPrompt />

        {donatedToday && currentUser ? (
          <ContributionSection />
        ) : (
          <S.Title>{t("title")}</S.Title>
        )}
      </S.ContainerPadding>
      <CausesSection />
      <ReportsSection />
      <ClubSection isMember={isMember} refetch={refetchIsMember} />
      <DonationErrorModal newState={params?.newState} />
    </S.Container>
  );
}
