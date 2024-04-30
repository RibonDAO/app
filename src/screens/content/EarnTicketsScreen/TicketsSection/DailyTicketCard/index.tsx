import { useFocusEffect } from "@react-navigation/native";
import { setLocalStorageItem, theme } from "@ribon.io/shared";
import TicketIllustration from "assets/illustrations/TicketIllustration";
import CollectableButton from "components/atomics/buttons/CollectableButton";
import CardTicket from "components/moleculars/CardTicket";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { useNavigation } from "hooks/useNavigation";
import { getTimeUntilMidnight } from "lib/formatters/dateFormatter";
import { RECEIVED_RIBON_DAILY_TICKET } from "lib/localStorage/constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { useTickets } from "../../../../../hooks/useTickets";

export default function DailyTicketCard() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.ticketsSection",
  });

  const [hasCollected, setHasCollected] = useState(false);
  const [time, setTime] = useState<string>("24:00");
  const { canCollectRibonTicket, handleCollect } = useTickets();
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();

  const setTimeUntilMidnight = () => {
    const timeUntilMidnight = getTimeUntilMidnight();
    setTime(timeUntilMidnight);
  };

  const receiveTicket = async () => {
    if (!currentUser) {
      setHasCollected(false);
      return;
    }
    const canCollect = await canCollectRibonTicket();
    if (!canCollect) {
      setHasCollected(true);
      setTimeUntilMidnight();
    }
  };

  const handleButtonPress = async () => {
    if (!currentUser) navigateTo("SignInScreen");
    else {
      await handleCollect({
        onSuccess: () => {
          setHasCollected(true);
          logEvent("ticketCollected", { from: "collect" });
          refetchTickets();
          setTimeUntilMidnight();
          setLocalStorageItem(
            RECEIVED_RIBON_DAILY_TICKET,
            Date.now().toString(),
          );
        },
      });
    }
  };

  useEffect(() => {
    receiveTicket();
  }, [currentUser]);

  useFocusEffect(() => {
    if (hasCollected) {
      setTimeUntilMidnight();
    }
  });

  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketWhiteIcon />,
        text: t("dailyTicketCard.subtitle"),
        color: theme.colors.brand.primary[900],
      }}
      icon={<TicketIllustration />}
    >
      <CollectableButton
        text={t("dailyTicketCard.buttonText")}
        afterText={t("dailyTicketCard.buttonTextCollected", { time })}
        collected
        onClick={handleButtonPress}
      />
    </CardTicket>
  );
}
