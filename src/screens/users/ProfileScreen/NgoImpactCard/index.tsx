import { View, Text } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import S from "./styles";

export type Props = {
  name: string;
  icon: string;
  onPress?: () => void;
  description?: string | JSX.Element;
};

function NgoImpactCard({
  icon,
  name,
  description,
  onPress,
}: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={S.container}>
      <View style={S.impactCardContainer}>
        <View style={S.contentSection}>
          <Image source={{ uri: icon }} style={S.image} />
          <Text style={S.impact}>{name}</Text>
          <Text style={S.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NgoImpactCard;
