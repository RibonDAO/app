/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import { useCauseContributionContext } from "contexts/causesContributionContext";
import { useCausesContext } from "contexts/causesContext";
import Button from "components/atomics/buttons/Button";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useLanguage } from "contexts/languageContext";
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
  const { setChosenCauseId, setChosenCauseIndex } =
    useCauseContributionContext();
  const { causes } = useCausesContext();
  const { navigateTo } = useNavigation();
  const { currentLang } = useLanguage();
  const { offer, contribution } = useImpactConversion();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen.contributionImage",
  });

  const handleClick = () => {
    setChosenCauseId(idCause);
    setChosenCauseIndex(causes.findIndex((cause) => cause.id === idCause));

    navigateTo("CheckoutScreen", { offer: offer?.priceCents });
  };

  const currentCurrency = currentLang === "pt-BR" ? "brl" : "usd";

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
        <View style={S.bottomContainer}>
          <View style={S.textContainer}>
            <Text style={S.title}>
              {t("donateFor", {
                value: formatPrice(
                  contribution?.value ?? offer?.priceValue ?? 0,
                  offer?.currency ?? currentCurrency,
                ),
              })}
            </Text>
            <Text style={S.name}>{name}</Text>
          </View>
          <Button
            text="Doar agora"
            onPress={handleClick}
            backgroundColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral10}
            customStyles={{
              position: "absolute",
              bottom: 0,
              width: 116,
              right: 36,
            }}
          />
        </View>
      </View>

      <View style={S.overlay} />
    </TouchableOpacity>
  );
}

export default ContributionImage;
