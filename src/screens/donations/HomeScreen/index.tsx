import { useFocusEffect } from "@react-navigation/native";
import { useFirstAccessToIntegration } from "@ribon.io/shared";
import { useCouponContext } from "contexts/couponContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useIsOnboarding } from "contexts/onboardingContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { useCallback } from "react";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export default function HomeScreen() {
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect } = useTickets();
  const { onboardingCompleted } = useIsOnboarding();
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { couponId } = useCouponContext();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(currentIntegrationId);

  async function receiveTicket() {
    const canCollect = await handleCanCollect();
    const receivedTicketToday = await hasReceivedTicketToday();
    const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;
    if (couponId !== "" && couponId !== undefined) {
      navigateTo("GiveTicketByCouponScreen");
    } else if (canCollect) {
      if (currentUser && !receivedTicketToday) {
        if (!isRibonIntegration) {
          navigateTo("GiveTicketV2Screen");
        } else {
          navigateTo("TabNavigator", { screen: "CausesScreen" });
        }
      } else if (!currentUser && onboardingCompleted !== true) {
        navigateTo("OnboardingScreen");
      } else {
        navigateTo("TabNavigator", { screen: "CausesScreen" });
      }
    } else {
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
      couponId,
    ]),
  );
  return null;
}
