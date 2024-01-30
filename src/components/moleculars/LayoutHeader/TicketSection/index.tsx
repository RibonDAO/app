import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "contexts/ticketsContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import TicketIconText from "components/moleculars/TicketIconText";

type TicketSectionProps = {
  hasDividerBorder?: boolean;
};

function TicketSection({
  hasDividerBorder = false,
}: TicketSectionProps): JSX.Element {
  const { ticketsCounter: tickets, refetch } = useTickets();
  const hasTickets = tickets > 0;
  const { navigateTo } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      refetch();
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
      tickets={tickets}
      hasDividerBorder={hasDividerBorder}
      onClick={handleTicketClick}
    />
  );
}

export default TicketSection;
