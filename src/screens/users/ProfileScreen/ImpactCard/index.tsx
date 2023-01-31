import { View, Text } from "components/Themed";
import { TouchableOpacity } from "react-native";
import S from "./styles";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";

export type Props = {
  impact: number;
  iconName?: string;
  onPress?: () => void;
  description: string;
};

function ImpactCard({ iconName, impact, description, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={S.badgeContainer}>
      <View style={S.badgeRoundContainer}>
        <Icon type="rounded" name={iconName} color={theme.colors.green40} size={24} />
        <Text style={S.impact}>{impact}</Text>
        <Text style={S.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ImpactCard;
