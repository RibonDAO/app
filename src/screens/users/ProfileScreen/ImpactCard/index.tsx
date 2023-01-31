import { View, Text } from "components/Themed";
import { TouchableOpacity } from "react-native";
import TicketIcon from "components/vectors/TicketIcon";
import S from "./styles";

export type Props = {
  impact: number;
  icon?: JSX.Element;
  onPress?: () => void;
  description: string;
};

function ImpactCard({ icon, impact, description, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={S.badgeContainer}>
      <View style={S.badgeRoundContainer}>
        <TicketIcon />
        <Text style={S.impact}>{impact}</Text>
        <Text style={S.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ImpactCard;
