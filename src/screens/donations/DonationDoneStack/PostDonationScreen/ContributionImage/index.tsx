import { Text, TouchableOpacity } from "react-native";
import { useCausesContext } from "contexts/causesContext";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import S from "./styles";

type Props = {
  idCause: number;
  name: string;
  coverImage?: string;
  isCause?: boolean;
};

function ContributionImage({
  name,
  coverImage = "",
  idCause,
  isCause = false,
}: Props) {
  const { setCurrentCauseId } = useCausesContext();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen.contributionImage",
  });

  const handleClick = () => {
    setCurrentCauseId(idCause);
    navigateTo("PromotersScreen", { isInCommunity: !!isCause });
  };

  return (
    <TouchableOpacity style={S.container} onPress={handleClick} key={name}>
      <Image style={S.imageContainer} source={{ uri: coverImage }} />

      {isCause && (
        <View style={S.label}>
          <Icon
            type="rounded"
            name="rocket_launch"
            size={16}
            color={theme.colors.brand.secondary[700]}
          />
          <Text style={S.labelTitle}>{t("labelTitle")}</Text>
        </View>
      )}

      <View style={S.contentContainer}>
        <Text style={S.title}>
          {isCause ? t("donateAsCommunity") : t("donateDirectly")}
        </Text>
        <Text style={S.name}>{name}</Text>
      </View>

      <View style={S.overlay} />
    </TouchableOpacity>
  );
}

export default ContributionImage;
