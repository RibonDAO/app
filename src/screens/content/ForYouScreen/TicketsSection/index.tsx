import { View } from "react-native";
import { useTickets, useSubscriptions } from "@ribon.io/shared/hooks";
import { Categories } from "@ribon.io/shared";
import { useTicketsContext } from "contexts/ticketsContext";

import { useCallback } from "react";

import { useCurrentUser } from "contexts/currentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";
import ClubDailyTicketCard from "./ClubDailyTicketCard";
import ClubMonthlyTicketCard from "./ClubMonthlyTicketCard";

export default function TicketsSection() {
  const { userIsMember } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();
  const { getTicketsToCollect } = useTickets();
  const { toCollect, refetch } = getTicketsToCollect(Categories.CLUB);
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();

  const refetchTicketsToCollect = () => {
    refetch();
    refetchTickets();
    refetchIsMember();
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
      />
      <ClubMonthlyTicketCard
        tickets={toCollect?.monthlyTickets}
        isMember={isMember}
        refetchTickets={refetchTicketsToCollect}
      />
    </View>
  );
}
