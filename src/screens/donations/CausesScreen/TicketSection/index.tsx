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

  async function fetchTicketReceived() {
    const alreadyReceivedTicket = await getLocalStorageItem(
      ALREADY_RECEIVED_TICKET_KEY,
    );

    const { canCollect } = await canCollectByIntegration(
      currentIntegrationId,
      currentUser?.email ?? "",
    );

    if (canCollect) {
      if (alreadyReceivedTicket !== "true") {
        setLocalStorageItem(ALREADY_RECEIVED_TICKET_KEY, "true");
        collectByIntegration(currentIntegrationId, currentUser?.email ?? "");
      }

      if (!isFirstAccessToIntegration) {
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
  }

  useEffect(() => {
    fetchTicketReceived();
  }, [canDonate]);

  return null;
}

export default TicketSection;
