import { View, Text } from "components/Themed";
import { Image, TouchableOpacity } from "react-native";
import S from "./styles";


export type Props = {
  impact: string;
  icon?: JSX.Element;
  onPress?: () => void;
  description: string;
};

function NgoImpactCard({ icon, impact, description, onPress }: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={S.badgeContainer}>
      <View style={S.impactCardContainer}>
        <View style={S.imageSection}>
          <Image source={require("./ngo.png")} />
        </View>
        <View style={S.contentSection}>
          <Text style={S.impact}>{impact}</Text>
          <Text style={S.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NgoImpactCard;
