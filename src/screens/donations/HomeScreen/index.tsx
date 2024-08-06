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
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function HomeScreen() {
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect } = useTickets();
  const { onboardingCompleted } = useIsOnboarding();
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { couponId } = useCouponContext();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(currentIntegrationId);

  const hasCoupon = couponId !== "" && couponId !== undefined;
  const hasUserAndExternalId = currentUser && externalId && externalId !== "";
  const hasNoUserAndNotCompletedOnboarding =
    !currentUser && onboardingCompleted !== true;

  async function receiveTicket() {
    try {
      const canCollect = await handleCanCollect();
      const receivedTicketToday = await hasReceivedTicketToday();
      const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;
      const hasUserAndNotReceivedIntegrationTicketToday =
        currentUser && !receivedTicketToday && !isRibonIntegration;

      if (hasCoupon) {
        navigateTo("GiveTicketByCouponScreen");
      } else if (canCollect) {
        if (hasUserAndExternalId) {
          navigateTo("TabNavigator", { screen: "EarnTicketsScreen" });
        } else if (hasUserAndNotReceivedIntegrationTicketToday) {
          navigateTo("TabNavigator", { screen: "EarnTicketsScreen" });
        } else if (hasNoUserAndNotCompletedOnboarding) {
          navigateTo("OnboardingScreen");
        } else {
          navigateTo("TabNavigator", { screen: "EarnTicketsScreen" });
        }
      } else {
        navigateTo("TabNavigator", { screen: "CausesScreen" });
      }
    } finally {
      SplashScreen.hideAsync();
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
