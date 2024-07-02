/* eslint-disable no-nested-ternary */
import { theme, TicketsCategories } from "@ribon.io/shared";
import CardTicket from "components/moleculars/CardTicket";
import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { logEvent } from "services/analytics";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CollectableButton from "components/atomics/buttons/CollectableButton";
import {
  add30DaysAndFormatDate,
  stringToLocaleDateString,
} from "lib/formatters/dateFormatter";
import { useFocusEffect } from "@react-navigation/native";
import { perform } from "lib/timeoutHelpers";
import { useClubSubscriptionContext } from "contexts/clubSubscriptionContext";
import { useLanguage } from "contexts/languageContext";
import TicketCardPlaceholder from "../placeholder/placeholder";

type Props = {
  tickets?: number;
  isMember?: boolean;
  refetchTickets: () => void;
  plan?: number;
  setUnauthorizedModalVisible: (value: boolean) => void;
};
export default function ClubMonthlyTicketCard({
  tickets = 0,
  isMember,
  refetchTickets,
  plan,
  setUnauthorizedModalVisible,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCollected, setHasCollected] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [localTickets, setLocalTickets] = useState(tickets);

  const [nextPaymentAttempt, setNextPaymentAttempt] = useState<string | null>(
    null,
  );

  const { clubSubscription } = useClubSubscriptionContext();
  const { currentLang } = useLanguage();

  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.clubTicketsSection",
  });

  const colors = [
    theme.colors.brand.tertiary[600], // initial color
    theme.colors.brand.tertiary[600],
    "#F97303",
    theme.colors.brand.quaternary[200],
    theme.colors.brand.tertiary[100], // final color
  ];

  const buttonText =
    tickets > 1
      ? t("monthlyTicketCard.buttonTextPlural", { value: tickets })
      : t("monthlyTicketCard.buttonText", { value: tickets });

  const buttonTextHasCollected = clubSubscription?.cancelDate
    ? t("monthlyTicketCard.subscriptionExpiration", { nextPaymentAttempt })
    : t("monthlyTicketCard.buttonTextCollected", { nextPaymentAttempt });

  const buttonTextHasClub = hasCollected ? buttonTextHasCollected : buttonText;

  const { navigateTo } = useNavigation();

  const { handleCollectByClub } = useTickets();

  const { isAuthenticated } = useAuthentication();

  const changeHasCollected = async () => {
    try {
      setHasCollected(false);
      if (isMember && tickets === 0 && !startAnimation) setHasCollected(true);
    } finally {
      perform(() => setIsLoading(false)).in(1000);
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
    }, [isMember, tickets, startAnimation]),
  );

  const handleSuccess = () => {
    setStartAnimation(true);
    logEvent("ticketCollected", {
      amount: tickets,
      from: "monthlyClub",
    });
    refetchTickets();
    perform(() => setStartAnimation(false)).in(2500);
  };

  const handleButtonPress = async () => {
    if (!isMember) {
      navigateTo("ClubScreen");
      logEvent("clubCTA_click", { from: "clubMonthlyTicket_card" });
    } else if (!isAuthenticated()) {
      setUnauthorizedModalVisible(true);
    } else {
      await handleCollectByClub({
        category: TicketsCategories.MONTHLY,
        onSuccess: () => {
          handleSuccess();
        },
      });
    }
  };

  useEffect(() => {
    if (!isMember) {
      logEvent("clubCTA_view", { from: "clubMonthlyTicket_card" });
    }
  }, []);

  useEffect(() => {
    if (tickets !== 0) {
      setLocalTickets(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (clubSubscription && currentLang) {
      setNextPaymentAttempt(
        clubSubscription?.nextPaymentAttempt
          ? stringToLocaleDateString(clubSubscription.nextPaymentAttempt)
          : add30DaysAndFormatDate(clubSubscription.createdAt, currentLang),
      );
    }
  }, [clubSubscription, currentLang]);

  if (isLoading) return <TicketCardPlaceholder />;
  return (
    <CardTicket
      title={t("monthlyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: plan
          ? t("monthlyTicketCard.subtitleWithValue", { value: plan })
          : t("monthlyTicketCard.subtitle"),
        color: theme.colors.brand.tertiary[900],
      }}
      background="ticketBox"
    >
      <CollectableButton
        text={
          isMember ? buttonTextHasClub : t("monthlyTicketCard.buttonTextNoClub")
        }
        afterText={buttonTextHasCollected}
        locked={hasCollected}
        onClick={handleButtonPress}
        startAnimation={startAnimation}
        colors={colors}
        amount={localTickets}
      />
    </CardTicket>
  );
}
