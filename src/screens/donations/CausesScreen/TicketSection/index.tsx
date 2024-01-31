import { useEffect } from "react";
import { showToast } from "lib/Toast";
import { useNavigation } from "hooks/useNavigation";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  theme,
} from "@ribon.io/shared";
import { useTickets } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { PLATFORM } from "utils/constants/Application";
import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";
import { useAuthentication } from "contexts/authenticationContext";
import { todayDate } from "lib/dateUtils";

type Props = {
  canDonate: boolean;
  isFirstAccessToIntegration: boolean | undefined;
};

export const ALREADY_RECEIVED_TICKET_KEY = "ALREADY_RECEIVED_TICKET_KEY";
function TicketSection({ canDonate, isFirstAccessToIntegration }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.ticketSection",
  });
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { currentIntegrationId } = useIntegrationContext();
  const { collectByIntegration, canCollectByIntegration } = useTickets();
  const { accessToken } = useAuthentication();

  async function hasReceivedTicketToday() {
    const donationToastSeenAtKey = getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );
    const donationToastIntegration = getLocalStorageItem(
      DONATION_TOAST_INTEGRATION,
    );

    if (
      donationToastSeenAtKey &&
      donationToastIntegration === currentIntegrationId
    ) {
      const dateUserSawToast = new Date(parseInt(donationToastSeenAtKey, 10));
      return dateUserSawToast.toLocaleDateString() === todayDate();
    }
    return false;
  }

  async function receiveTicket() {
    const { canCollect } = await canCollectByIntegration(
      currentIntegrationId ?? "",
      currentUser?.email ?? "",
      PLATFORM,
    );

    if (canCollect && !hasReceivedTicketToday()) {
      if (!accessToken) {
        await collectByIntegration(
          currentIntegrationId ?? "",
          currentUser?.email ?? "",
          PLATFORM,
        );
      }
      setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
      setLocalStorageItem(
        DONATION_TOAST_INTEGRATION,
        currentIntegrationId?.toLocaleString(),
      );
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
    } else {
      navigateTo("GiveTicketScreen", {
        isOnboarding: true,
      });
    }
  }

  useEffect(() => {
    if (isFirstAccessToIntegration !== undefined) {
      receiveTicket();
    }
  }, [isFirstAccessToIntegration, currentIntegrationId]);

  return null;
}

export default TicketSection;
