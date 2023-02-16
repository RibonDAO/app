import { Image, Text, TouchableOpacity } from "react-native";
import { useCausesContext } from "contexts/causesContext";
import Intersection from "components/vectors/Intersect";
import S from "./styles";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
};

function CauseImage({ name, coverImage, id }: Props) {
  const { setCurrentCauseId } = useCausesContext();
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    setCurrentCauseId(id);
    navigateTo("PromotersScreen");
  };

  return (
    <TouchableOpacity style={S.container} onPress={handleClick} key={name}>
      <Image style={S.imageContainer} source={{ uri: coverImage }} />

      <Text style={S.causeName}>{name}</Text>

      <View style={S.intersection}>
        <Intersection />
      </View>
    </TouchableOpacity>
  );
}

export default CauseImage;
