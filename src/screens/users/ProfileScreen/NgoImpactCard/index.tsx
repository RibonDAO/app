import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
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
    <TouchableOpacity onPress={onPress} style={S.badgeContainer}>
      <View style={S.impactCardContainer}>
        <View style={S.imageSection}>
          <Image source={{ uri: icon }} style={S.image} />
        </View>
        <View style={S.contentSection}>
          <Text style={S.impact}>{name}</Text>
          <Text style={S.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NgoImpactCard;
