import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export type Props = {
  impact: number;
  iconName?: string;
  onPress?: () => void;
  description: string;
  color?: string;
};

function ImpactCard({
  iconName,
  impact,
  description,
  onPress,
  color = theme.colors.brand.primary[800],
}: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={S.badgeContainer}>
      <View style={S.badgeRoundContainer}>
        <Icon type="rounded" name={iconName} color={color} size={24} />
        <Text style={[S.impact, { color }]}>{impact}</Text>
        <Text style={[S.description, { color }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ImpactCard;
