/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import { useCauseContributionContext } from "contexts/causesContributionContext";
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
  const { setChosenCauseId } = useCauseContributionContext();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen.contributionImage",
  });

  const handleClick = () => {
    setChosenCauseId(idCause);
    navigateTo("PromotersScreen", { isInCommunity: !!isCause });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={S.container}
      onPress={handleClick}
      key={name}
    >
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
