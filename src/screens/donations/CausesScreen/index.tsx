import React, { useCallback, useState, useMemo } from "react";
import {
  useFirstAccessToIntegration,
  useDonatedToday,
  useSubscriptions,
} from "@ribon.io/shared/hooks";
import { RefreshControl, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { logError } from "services/crashReport";
import { useTicketsContext } from "contexts/ticketsContext";
import { useFocusEffect } from "@react-navigation/native";
import IntegrationBanner from "components/moleculars/IntegrationBanner";
import usePageView from "hooks/usePageView";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useRouteParams } from "hooks/useRouteParams";
import NewHeader from "components/moleculars/NewHeader";
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
  const { currentIntegrationId } = useIntegrationContext();

  const { donatedToday } = useDonatedToday();
  const {
    isFirstAccessToIntegration,
    refetch: refetchFirstAccessToIntegration,
    isLoading: loadingFirstAccessToIntegration,
  } = useFirstAccessToIntegration(currentIntegrationId);
  const { integration } = useIntegrationContext();
  const { ticketsCounter } = useTicketsContext();

  const [refreshing, setRefreshing] = useState(false);

  const { hasTickets, refetchTickets } = useTicketsContext();
  const { currentUser, signedIn } = useCurrentUser();
  const { params } = useRouteParams<"CausesScreen">();

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

  const shouldShowIntegrationBanner = useMemo(
    () =>
      !integration?.name?.toLowerCase()?.includes("ribon") &&
      integration &&
      !donatedToday &&
      hasTickets &&
      integration?.uniqueAddress !== INTEGRATION_AUTH_ID,
    [integration, donatedToday, hasTickets],
  );

  const { userIsMember, userSubscriptions } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();
  const { refetch: refetchUserSubscriptions } = userSubscriptions();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.allSettled([
        refetchTickets(),
        refetchIsMember(),
        refetchFirstAccessToIntegration(),
        refetchUserSubscriptions(),
      ]);
    } catch (e) {
      logError(e);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading || loadingFirstAccessToIntegration) return <Placeholder />;

  const renderHeader = useMemo(
    () => (
      <>
        <NewHeader />
        <S.ContainerPadding hasPaddingTop={!shouldShowIntegrationBanner}>
          {shouldShowIntegrationBanner && integration && (
            <IntegrationBanner integration={integration} />
          )}
          <NotificationPermissionPrompt />
          {donatedToday && currentUser ? (
            <>
              <ContributionSection />
              <S.Title>{t("titlePostDonation")}</S.Title>
            </>
          ) : (
            <S.Title>{t("title")}</S.Title>
          )}
        </S.ContainerPadding>
      </>
    ),
    [shouldShowIntegrationBanner, donatedToday, currentUser],
  );

  const sections = useMemo(
    () => [
      { id: "causes", component: <CausesSection /> },
      { id: "divider", component: <S.Divider /> },
      { id: "reports", component: <ReportsSection /> },
      {
        id: "club",
        component: (
          <ClubSection isMember={isMember} refetch={refetchIsMember} />
        ),
      },
      {
        id: "errorModal",
        component: <DonationErrorModal newState={params?.newState} />,
      },
    ],
    [isMember, params?.newState, currentUser],
  );

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <View>{item.component}</View>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
