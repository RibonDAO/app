import { useFocusEffect } from "@react-navigation/native";
import { theme, useFirstAccessToIntegration } from "@ribon.io/shared";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useIsOnboarding } from "contexts/onboardingContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { showToast } from "lib/Toast";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export default function HomeScreen() {
  const { navigateTo } = useNavigation();
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect, handleCollect } =
    useTickets();
  const { onboardingCompleted } = useIsOnboarding();
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(currentIntegrationId);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

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
          navigateTo("TabNavigator", { screen: "CausesScreen" });
        } else {
          navigateTo("GiveTicketV2Screen");
        }
      } else if (!currentUser && onboardingCompleted !== true) {
        navigateTo("TabNavigator", { screen: "ImpactScreen" });
      }
    } else {
      refetchTickets();
      navigateTo("TabNavigator", { screen: "CausesScreen" });
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
  return null;
}
