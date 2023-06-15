import { useEffect } from "react";
import { useTickets } from "contexts/ticketsContext";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { showToast } from "lib/Toast";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared";

type Props = {
  canDonate: boolean;
  isFirstAccessToIntegration: boolean | undefined;
};

export const ALREADY_RECEIVED_TICKET_KEY = "ALREADY_RECEIVED_TICKET_KEY";
function TicketSection({ canDonate, isFirstAccessToIntegration }: Props) {
  const { setTickets } = useTickets();
  const { navigateTo } = useNavigation();

  const handleTicketReceived = () => {
    setTickets(1);
    setLocalStorageItem(ALREADY_RECEIVED_TICKET_KEY, "true");
  };

  useEffect(() => {
    async function fetchTicketReceived() {
      const alreadyReceivedTicket = await getLocalStorageItem(
        ALREADY_RECEIVED_TICKET_KEY,
      );
      if (canDonate) {
        if (alreadyReceivedTicket === "true") setTickets(1);

        if (alreadyReceivedTicket !== "true") {
          handleTicketReceived();
          if (!isFirstAccessToIntegration) {
            showToast({
              type: "custom",
              message: "You have a new ticket!",
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
    }
    fetchTicketReceived();
  }, []);

  return null;
}

export default TicketSection;
