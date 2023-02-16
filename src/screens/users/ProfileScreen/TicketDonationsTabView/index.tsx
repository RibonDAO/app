import { View } from "react-native";
import NgoImpactCards from "../NgoImpactCards";
import S from "./styles";

function TicketDonationsTabView(): JSX.Element {
  return (
    <View style={S.container}>
      <NgoImpactCards />
    </View>
  );
}

export default TicketDonationsTabView;
