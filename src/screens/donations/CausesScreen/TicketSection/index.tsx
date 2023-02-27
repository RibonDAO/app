import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import BlankModal from "components/moleculars/modals/BlankModal";
import React, { useEffect, useState } from "react";
import { useTickets } from "contexts/ticketsContext";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import S from "../styles";

type Props = {
  canDonate: boolean;
};

export const ALREADY_RECEIVED_TICKET_KEY = "ALREADY_RECEIVED_TICKET_KEY";
function TicketSection({ canDonate }: Props) {
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const { setTickets } = useTickets();
  const handleTicketReceived = () => {
    setLocalStorageItem(ALREADY_RECEIVED_TICKET_KEY, "true");
    setTicketModalVisible(false);
    setTickets(1);
  };

  useEffect(() => {
    async function fetchTicketReceived() {
      const alreadyReceivedTicket = await getLocalStorageItem(
        ALREADY_RECEIVED_TICKET_KEY,
      );
      if (canDonate) {
        if (alreadyReceivedTicket === "true") setTickets(1);

        setTicketModalVisible(alreadyReceivedTicket !== "true");
      }
    }

    fetchTicketReceived();
  }, []);

  return (
    <BlankModal
      visible={ticketModalVisible}
      setVisible={setTicketModalVisible}
      containerStyle={S.containerTicket}
      onModalHide={() => {
        handleTicketReceived();
      }}
    >
      <ReceiveTicketScreen onTicketReceived={handleTicketReceived} />
    </BlankModal>
  );
}

export default TicketSection;
