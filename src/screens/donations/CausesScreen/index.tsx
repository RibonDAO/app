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
import { CRMregisterDeviceToken, CRMupdateUserAttributes } from "services/crm";
import { getNotificationToken } from "lib/notifications";
import Header from "./Header";
import Placeholder from "./placeholder";
import ContributionSection from "./ContributionSection";
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

  useEffect(() => {
    if (!currentUser) return;

    CRMupdateUserAttributes(currentUser.email, {
      last_access: new Date().toISOString(),
    });
    getNotificationToken().then((token) => {
      CRMregisterDeviceToken(currentUser.email, token);
    });
  }, [currentUser]);

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

  const { userIsMember } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.allSettled([
        refetchTickets(),
        refetchIsMember(),
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
          <NotificationPermissionPrompt currentUser={currentUser} />
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
          <ClubSection isMember={isMember} refetch={refetchIsMember} />
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
    [isMember, params?.newState, unauthorizedModalVisible],
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
