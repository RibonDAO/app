import { useNavigation } from "hooks/useNavigation";
import { useTicketsContext } from "contexts/ticketsContext";
import TicketIconText from "components/moleculars/TicketIconText";
import { useState } from "react";
import { useSubscriptions } from "@ribon.io/shared";
import ZeroTicketsModal from "../modals/ZeroTicketsModal";

type TicketSectionProps = {
  hasDividerBorder?: boolean;
  outline?: boolean;
};

function TicketSection({
  hasDividerBorder = false,
  outline = false,
}: TicketSectionProps): JSX.Element {
  const { ticketsCounter: tickets } = useTicketsContext();
  const hasTickets = tickets > 0;
  const { navigateTo } = useNavigation();
  const [zeroTicketModalVisible, setZeroTicketModalVisible] = useState(false);
  const { userIsClubMember } = useSubscriptions();
  const { isClubMember } = userIsClubMember();

  const handleTicketClick = () => {
    if (hasTickets) {
      navigateTo("GiveTicketScreen");
    } else if (isClubMember) {
      navigateTo("TabNavigator", { screen: "EarnTicketsScreen" });
    } else {
      setZeroTicketModalVisible(true);
    }
  };

  return (
    <>
      <TicketIconText
        quantity={tickets}
        hasDividerBorder={hasDividerBorder}
        onClick={handleTicketClick}
        outline={outline}
      />

      <ZeroTicketsModal
        visible={zeroTicketModalVisible}
        setVisible={setZeroTicketModalVisible}
      />
    </>
  );
}

export default TicketSection;
