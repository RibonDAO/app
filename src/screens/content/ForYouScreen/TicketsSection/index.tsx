import { View } from "react-native";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";

export default function TicketsSection() {
  return (
    <View style={S.container}>
      <DailyTicketCard />
    </View>
  );
}
