import { useNavigation } from "hooks/useNavigation";
import { useTicketsContext } from "contexts/ticketsContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import TicketIconText from "components/moleculars/TicketIconText";

type TicketSectionProps = {
  hasDividerBorder?: boolean;
};

function TicketSection({
  hasDividerBorder = false,
}: TicketSectionProps): JSX.Element {
  const { ticketsCounter: tickets, refetchTickets } = useTicketsContext();
  const hasTickets = tickets > 0;
  const { navigateTo } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      refetchTickets();
    }, [tickets]),
  );
  const handleTicketClick = () => {
    if (hasTickets) {
      navigateTo("GiveTicketScreen");
    } else {
      navigateTo("ZeroTicketScreen");
    }
  };

  return (
    <TicketIconText
      quantity={tickets}
      hasDividerBorder={hasDividerBorder}
      onClick={handleTicketClick}
    />
  );
}

export default TicketSection;
