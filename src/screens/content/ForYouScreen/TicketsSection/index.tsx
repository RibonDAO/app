import { View } from "react-native";
import { useTickets, useSubscriptions } from "@ribon.io/shared/hooks";
import { Categories, Plan } from "@ribon.io/shared";
import { useTicketsContext } from "contexts/ticketsContext";

import { useCallback, useEffect, useState } from "react";

import { useCurrentUser } from "contexts/currentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";
import ClubDailyTicketCard from "./ClubDailyTicketCard";
import ClubMonthlyTicketCard from "./ClubMonthlyTicketCard";

export default function TicketsSection() {
  const { userIsMember, userSubscriptions } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();
  const { getTicketsToCollect } = useTickets();
  const { toCollect, refetch } = getTicketsToCollect(Categories.CLUB);
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { subscriptions, refetch: refetchSubscriptions } = userSubscriptions();
  const [plan, setPlan] = useState<Plan | undefined>(undefined);

  useEffect(() => {
    if (subscriptions) {
      const currentPlan = subscriptions?.find(
        (subscription) =>
          subscription.offer.category === "club" &&
          subscription.status === "active",
      )?.offer.plan;
      setPlan(currentPlan);
    } else {
      setPlan(undefined);
    }
  }, [subscriptions]);

  const refetchTicketsToCollect = () => {
    refetch();
    refetchTickets();
    refetchIsMember();
    refetchSubscriptions();
  };

  useFocusEffect(
    useCallback(() => {
      refetchTicketsToCollect();
    }, [toCollect, isMember, currentUser]),
  );

  return (
    <View style={S.container}>
      <DailyTicketCard />
      <ClubDailyTicketCard
        tickets={toCollect?.dailyTickets}
        isMember={isMember}
        refetchTickets={refetchTicketsToCollect}
        plan={plan?.dailyTickets}
      />
      <ClubMonthlyTicketCard
        tickets={toCollect?.monthlyTickets}
        isMember={isMember}
        refetchTickets={refetchTicketsToCollect}
        plan={plan?.monthlyTickets}
      />
    </View>
  );
}
