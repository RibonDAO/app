import { Text, View } from "react-native";

import { TouchableOpacity } from "react-native";

import TicketIcon from "components/vectors/TicketIcon";
import GrayTicketIcon from "components/vectors/GrayTicketIcon";

import { theme } from "@ribon.io/shared/styles";

import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "contexts/ticketsContext";
import S from "./styles";

function TicketSection(): JSX.Element {
  const { ticketsCounter: tickets } = useTickets();
  const hasTickets = tickets > 0;
  const ticketColor = hasTickets
    ? theme.colors.brand.primary[600]
    : theme.colors.neutral[500];
  const ticketIcon = hasTickets ? <TicketIcon /> : <GrayTicketIcon />;
  const { navigateTo } = useNavigation();

  const handleTicketClick = () => {
    if (hasTickets) {
      navigateTo("GiveTicketScreen");
    } else {
      navigateTo("ZeroTicketScreen");
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={S.container}
      onPress={handleTicketClick}
    >
      <View
        style={{
          ...S.ticketSection,
          borderColor: theme.colors.neutral[100],
        }}
      >
        {ticketIcon}
        <Text style={{ ...S.ticketCounter, color: ticketColor }}>
          {String(tickets)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default TicketSection;
