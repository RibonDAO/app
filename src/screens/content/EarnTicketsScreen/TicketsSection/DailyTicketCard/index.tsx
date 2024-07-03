import { useFocusEffect } from "@react-navigation/native";
import { theme } from "@ribon.io/shared";

import CollectableButton from "components/atomics/buttons/CollectableButton";
import CardTicket from "components/moleculars/CardTicket";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { useNavigation } from "hooks/useNavigation";
import { getTimeUntilMidnight } from "lib/formatters/dateFormatter";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { perform } from "lib/timeoutHelpers";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useTickets as useTicketShared } from "@ribon.io/shared/hooks";
import { useTickets } from "../../../../../hooks/useTickets";
import TicketCardPlaceholder from "../placeholder/placeholder";

export default function DailyTicketCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCollected, setHasCollected] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [time, setTime] = useState<string>("24:00");
  const { handleCollectDailyTicket } = useTickets();
  const { canCollectByIntegration } = useTicketShared();
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.ticketsSection",
  });

  const setTimeUntilMidnight = () => {
    const timeUntilMidnight = getTimeUntilMidnight();
    setTime(timeUntilMidnight);
  };

  const changeHasCollected = async () => {
    try {
      if (!currentUser) {
        setHasCollected(false);
      } else {
        const { canCollect } = await canCollectByIntegration(
          RIBON_INTEGRATION_ID,
          currentUser?.email ?? "",
        );
        setHasCollected(!canCollect);
      }
    } finally {
      perform(() => setIsLoading(false)).in(100);
    }
  };

  useFocusEffect(
    useCallback(
      () => () => {
        setIsLoading(true);
      },
      [],
    ),
  );

  useFocusEffect(
    useCallback(() => {
      changeHasCollected();
    }, [currentUser]),
  );

  const handleSuccess = () => {
    setStartAnimation(true);
    logEvent("ticketCollected", { from: "collect" });
    refetchTickets();
  };

  const handleButtonPress = async () => {
    if (!currentUser) navigateTo("SignInScreen");
    else {
      await handleCollectDailyTicket({
        onSuccess: () => {
          handleSuccess();
        },
      });
      setStartAnimation(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (hasCollected || startAnimation) {
        setTimeUntilMidnight();
      }
    }, [hasCollected, startAnimation]),
  );

  if (isLoading) return <TicketCardPlaceholder />;
  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketWhiteIcon />,
        text: t("dailyTicketCard.subtitle"),
        color: theme.colors.brand.primary[900],
      }}
      background="singleTicket"
    >
      <CollectableButton
        text={t("dailyTicketCard.buttonText")}
        afterText={t("dailyTicketCard.buttonTextCollected", { time })}
        locked={hasCollected}
        onClick={handleButtonPress}
        startAnimation={startAnimation}
      />
    </CardTicket>
  );
}
