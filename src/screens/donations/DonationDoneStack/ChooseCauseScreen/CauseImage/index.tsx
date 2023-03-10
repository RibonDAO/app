import { Text, TouchableOpacity } from "react-native";
import { useCausesContext } from "contexts/causesContext";
import S from "./styles";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";

type Props = {
  id: number;
  name: string;
  coverImage?: string;
};

function CauseImage({ name, coverImage, id }: Props) {
  const { setCurrentCauseId } = useCausesContext();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.chooseCauseScreen.causeImage",
  });

  const handleClick = () => {
    setCurrentCauseId(id);
    navigateTo("PromotersScreen");
  };

  return (
    <TouchableOpacity style={S.container} onPress={handleClick} key={name}>
      <Image style={S.imageContainer} source={{ uri: coverImage }} />

      <View style={S.label}>
        <Icon
          type="rounded"
          name="rocket_launch"
          size={16}
          color={theme.colors.brand.secondary[700]}
        />
        <Text style={S.labelTitle}>{t("labelTitle")}</Text>
      </View>

      <View style={S.contentContainer}>
        <Text style={S.causeTitle}>{t("title")}</Text>
        <Text style={S.causeName}>{name}</Text>
      </View>

      <View style={S.overlay} />
    </TouchableOpacity>
  );
}

export default CauseImage;
