import { ScrollView } from "react-native";
import NgoImpactCards from "../NgoImpactCards";
import S from "./styles";

function TicketDonationsTabView(): JSX.Element {
  return (
    <ScrollView style={S.container}>
      <NgoImpactCards />
    </ScrollView>
  );
}

export default TicketDonationsTabView;
