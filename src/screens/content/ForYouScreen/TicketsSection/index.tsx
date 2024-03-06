import { View } from "react-native";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";
import ClubDailyTicketCard from "./ClubDailyTicketCard";
import ClubMonthlyTicketCard from "./ClubMonthlyTicketCard";

export default function TicketsSection() {
  return (
    <View style={S.container}>
      <DailyTicketCard />
      <ClubDailyTicketCard />
      <ClubMonthlyTicketCard />
    </View>
  );
}
