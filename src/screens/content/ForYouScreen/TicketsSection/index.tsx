import { View } from "react-native";
import { useUserSubscription, useUserTickets } from "@ribon.io/shared/hooks";
import { Categories } from "@ribon.io/shared";

import { useTicketsContext } from "contexts/ticketsContext";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";
import ClubDailyTicketCard from "./ClubDailyTicketCard";
import ClubMonthlyTicketCard from "./ClubMonthlyTicketCard";

export default function TicketsSection() {
  const { userIsMember } = useUserSubscription();
  const { isMember } = userIsMember();
  const { getTicketsToCollect } = useUserTickets();
  const { toCollect, refetch } = getTicketsToCollect(Categories.CLUB);
  const { refetchTickets } = useTicketsContext();
  const refetchTicketsToCollect = () => {
    refetch();
    refetchTickets();
  };

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
