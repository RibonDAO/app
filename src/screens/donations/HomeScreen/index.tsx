import { useFocusEffect } from "@react-navigation/native";
import { useFirstAccessToIntegration } from "@ribon.io/shared";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useIsOnboarding } from "contexts/onboardingContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { useCallback } from "react";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export default function HomeScreen() {
  const { navigateTo } = useNavigation();
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect } = useTickets();
  const { onboardingCompleted } = useIsOnboarding();
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(currentIntegrationId);

  async function receiveTicket() {
    const canCollect = await handleCanCollect();
    const receivedTicketToday = await hasReceivedTicketToday();
    const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;
    if (canCollect) {
      if (currentUser && !receivedTicketToday) {
        if (!isRibonIntegration) {
          navigateTo("GiveTicketV2Screen");
        }
      } else if (!currentUser && onboardingCompleted !== true) {
        navigateTo("OnboardingScreen");
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
