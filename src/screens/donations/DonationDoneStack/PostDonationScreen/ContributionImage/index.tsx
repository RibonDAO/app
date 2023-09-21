/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Linking, Platform, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { Currencies, theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useLanguage } from "contexts/languageContext";
import { logEvent } from "services/analytics";
import { useEffect } from "react";
import S from "./styles";

type Props = {
  idCause: number;
  name: string;
  coverImage?: string;
  isCause?: boolean;
  from?: string;
};

function ContributionImage({
  name,
  coverImage = "",
  idCause,
  isCause = false,
  from,
}: Props) {
  const { navigateTo } = useNavigation();
  const { currentLang } = useLanguage();
  const { offer, contribution, nonProfit } = useImpactConversion();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen.contributionImage",
  });

  const currentCurrency =
    currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD;

  useEffect(() => {
    logEvent(isCause ? "contributeCauseBtn_view" : "contributeNgoBtn_view", {
      from,
    });
  }, []);

  const target = isCause ? "cause" : "non_profit";
  const targetId = isCause ? idCause : nonProfit?.id;

  const handleClick = () => {
    logEvent(isCause ? "giveCauseBtn_start" : "giveNgoBtn_start", {
      from,
      coin: offer?.currency,
      nonProfitId: nonProfit?.id,
      causeId: nonProfit?.cause?.id,
      offerId: offer?.id,
    });

    if (Platform.OS === "ios") {
      const url = `https://dapp.ribon.io/promoters/recurrence?target=${target}&target_id=${targetId}&currency=${offer?.currency}&offer=${offer?.priceCents}`;
      Linking.openURL(url);
    } else {
      navigateTo("RecurrenceScreen", {
        targetId,
        target,
        offer: offer ? offer.priceCents : 0,
        currency: currentCurrency,
        subscription: false,
      });
    }
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
            text={t("buttonText")}
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
