/* eslint-disable no-nested-ternary */
import { TicketsCategories, theme } from "@ribon.io/shared";
import CardTicket from "components/moleculars/CardTicket";
import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { logEvent } from "services/analytics";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CollectableButton from "components/atomics/buttons/CollectableButton";
import { getTimeUntilMidnight } from "lib/formatters/dateFormatter";
import { useFocusEffect } from "@react-navigation/native";
import { perform } from "lib/timeoutHelpers";
import { useCurrentUser } from "contexts/currentUserContext";

type Props = {
  tickets?: number;
  isMember?: boolean;
  refetchTickets: () => void;
  plan?: number;
  setUnauthorizedModalVisible: (value: boolean) => void;
};
export default function ClubDailyTicketCard({
  tickets = 0,
  isMember,
  refetchTickets,
  plan,
  setUnauthorizedModalVisible,
}: Props) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [time, setTime] = useState<string>("24:00");
  const [hasCollected, setHasCollected] = useState(false);
  const { currentUser } = useCurrentUser();

  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.clubTicketsSection",
  });

  const colors = [
    theme.colors.brand.tertiary[600], // initial color
    theme.colors.brand.primary[300],
    "#F97303",
    theme.colors.brand.quaternary[200],
    theme.colors.brand.tertiary[100], // final color
  ];

  const buttonText =
    tickets > 1
      ? t("dailyTicketCard.buttonTextPlural", { value: tickets })
      : t("dailyTicketCard.buttonText", { value: tickets });

  const buttonTextHasClub = hasCollected
    ? t("dailyTicketCard.buttonTextCollected")
    : buttonText;

  const { navigateTo } = useNavigation();

  const { handleCollectByClub } = useTickets();

  const { isAuthenticated } = useAuthentication();

  const setTimeUntilMidnight = () => {
    const timeUntilMidnight = getTimeUntilMidnight();
    setTime(timeUntilMidnight);
  };

  const changeHasCollected = async () => {
    if (!currentUser) {
      setHasCollected(false);
    } else if (isMember && tickets === 0 && !startAnimation) {
        setHasCollected(true);
      } else {
        setHasCollected(false);
      }
  };

  const handleSuccess = () => {
    setStartAnimation(true);
    logEvent("ticketCollected", {
      amount: tickets,
      from: "dailyClub",
    });
    refetchTickets();
    perform(() => setStartAnimation(false)).in(2500);
  };

  const handleButtonPress = async () => {
    if (!isMember) {
      navigateTo("ClubScreen");
      logEvent("clubCTA_click", { from: "clubDailyTicket_card" });
    } else if (!isAuthenticated()) {
      setUnauthorizedModalVisible(true);
    } else {
      await handleCollectByClub({
        category: TicketsCategories.DAILY,
        onSuccess: () => {
          handleSuccess();
        },
      });
    }
  };

  useEffect(() => {
    if (!isMember) {
      logEvent("clubCTA_view", { from: "clubDailyTicket_card" });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      changeHasCollected();
    }, [currentUser, isMember, tickets, startAnimation]),
  );

  useFocusEffect(
    useCallback(() => {
      if (hasCollected || startAnimation) {
        setTimeUntilMidnight();
      }
    }, [hasCollected, startAnimation]),
  );

  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: plan
          ? t("dailyTicketCard.subtitleWithValue", { value: plan })
          : t("dailyTicketCard.subtitle"),
        color: theme.colors.brand.tertiary[900],
      }}
      background="multipleTickets"
    >
      <CollectableButton
        text={
          isMember ? buttonTextHasClub : t("dailyTicketCard.buttonTextNoClub")
        }
        afterText={t("dailyTicketCard.buttonTextCollected", { time })}
        locked={hasCollected}
        onClick={handleButtonPress}
        startAnimation={startAnimation}
        colors={colors}
        amount={plan}
      />
    </CardTicket>
  );
}
