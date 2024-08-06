import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { useAuthentication } from "contexts/authenticationContext";
import * as StoreReview from "expo-store-review";
import Header from "./Header";
import Placeholder from "./placeholder";
import ImpressBannerSection from "./ImpressBannerSection";
import DonationErrorModal from "./errorModalSection";
import ClubSection from "./ClubSection";
import ReportsSection from "./ReportsSection";
import NotificationPermissionPrompt from "./NotificationPermissionPrompt";
import CausesSection from "./CausesSection";
import UnauthorizedModal from "./UnauthorizedModal";
import * as S from "./styles";

export default function CausesScreen() {
  usePageView("P26_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { isLoading } = useNonProfitsContext();
  const { currentIntegrationId } = useIntegrationContext();

  const { donatedToday, refetch: refetchDonatedToday } = useDonatedToday();
  const {
    refetch: refetchFirstAccessToIntegration,
    isLoading: loadingFirstAccessToIntegration,
  } = useFirstAccessToIntegration(currentIntegrationId);
  const { integration } = useIntegrationContext();

  const [refreshing, setRefreshing] = useState(false);

  const { hasTickets, refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { accessToken } = useAuthentication();
  const [unauthorizedModalVisible, setUnauthorizedModalVisible] =
    useState(false);
  const { params } = useRouteParams<"CausesScreen">();

  useFocusEffect(
    useCallback(() => {
      refetchTickets();
      refetchFirstAccessToIntegration();
      refetchDonatedToday();
    }, [currentUser, currentIntegrationId, accessToken]),
  );

  const shouldShowIntegrationBanner = useMemo(
    () =>
      !integration?.name?.toLowerCase()?.includes("ribon") &&
      integration &&
      hasTickets &&
      integration?.uniqueAddress !== INTEGRATION_AUTH_ID,
    [integration, hasTickets],
  );

  const { userIsClubMember } = useSubscriptions();
  const { isClubMember, refetch: refetchIsClubMember } = userIsClubMember();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.allSettled([
        refetchTickets(),
        refetchIsClubMember(),
        refetchFirstAccessToIntegration(),
        refetchDonatedToday(),
      ]);
    } catch (e) {
      logError(e);
    } finally {
      setRefreshing(false);
    }
  };

  const askForReview = async () => {
    if (await StoreReview.isAvailableAsync()) {
      StoreReview.requestReview();
    }
  };

  useEffect(() => {
    if (isLoading) return;
    requestTrackingPermissionsAsync();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (params?.shouldAskForReview) {
      askForReview();
    }
  }, [params?.shouldAskForReview, isLoading]);

  const renderHeader = useCallback(
    () => (
      <>
        <Header />
        <S.ContainerPadding hasPaddingTop={!shouldShowIntegrationBanner}>
          {shouldShowIntegrationBanner && integration && (
            <IntegrationBanner integration={integration} />
          )}
          <NotificationPermissionPrompt />
          {donatedToday && currentUser ? (
            <>
              <ImpressBannerSection />
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
      {
        id: "causes",
        component: (
          <CausesSection
            setUnauthorizedModalVisible={setUnauthorizedModalVisible}
          />
        ),
      },
      { id: "divider", component: <S.Divider /> },
      { id: "reports", component: <ReportsSection /> },
      {
        id: "club",
        component: (
          <ClubSection
            isClubMember={isClubMember}
            refetch={refetchIsClubMember}
          />
        ),
      },
      {
        id: "errorModal",
        component: <DonationErrorModal newState={params?.newState} />,
      },
      {
        id: "unauthorizedModal",
        component: (
          <UnauthorizedModal
            unauthorizedModalVisible={unauthorizedModalVisible}
            setUnauthorizedModalVisible={setUnauthorizedModalVisible}
          />
        ),
      },
    ],
    [isClubMember, params?.newState, unauthorizedModalVisible],
  );

  if (isLoading || loadingFirstAccessToIntegration) return <Placeholder />;

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
