import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { openInExternalBrowser, openInWebViewer } from "lib/linkOpener";
import { Currencies, ImpressionCard } from "@ribon.io/shared/types";
import { useImpressionCards } from "@ribon.io/shared/hooks";
import { useImpactConversion } from "hooks/useImpactConversion";
import { useLanguage } from "contexts/languageContext";
import { useTranslation } from "react-i18next";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useNavigation } from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import S from "./styles";

export type Props = {
  cardId: number | string;
};

export default function CardCampaign({ cardId }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();
  const { nonProfit, offer, description, contribution } = useImpactConversion();
  const { currentLang } = useLanguage();
  const { navigateTo } = useNavigation();

  const [currency, setCurrency] = useState<Currencies>(Currencies.BRL);

  useEffect(() => {
    if (offer) {
      setCurrency(offer?.currency === "brl" ? Currencies.BRL : Currencies.USD);
    } else {
      setCurrency(currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD);
    }
  }, [currentLang, offer]);

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = useCallback(async () => {
    const impressionCardData = await getImpressionCard(cardId);
    setImpressionCard(impressionCardData);
  }, [cardId]);

  useEffect(() => {
    logEvent("giveNgoBtn_view", {
      from: "cardCampaign",
      nonProfitId: nonProfit?.id,
      offer: offer?.priceCents,
      currency: offer?.currency,
    });
    fetchImpressionCard();
  }, []);

  const youtubeThumbnail = (url: string | undefined): string | undefined => {
    const videoId = url?.split("v=")[1];

    return (
      (url && `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`) ||
      undefined
    );
  };

  const openLink = () => {
    if (!impressionCard) return;

    openInExternalBrowser(impressionCard.ctaUrl);
  };

  const imageUri = useMemo<string | undefined>(
    () => impressionCard?.image || youtubeThumbnail(impressionCard?.videoUrl),
    [impressionCard],
  );

  const openYouTubeVideo = () => {
    if (impressionCard?.videoUrl) openInWebViewer(impressionCard.videoUrl);
  };

  const checkoutLink = () => {
    logEvent("giveNgoBtn_start", {
      from: "cardCampaign",
      nonProfitId: nonProfit?.id,
      offer: offer?.priceCents,
      currency: offer?.currency,
    });

    navigateTo("RecurrenceScreen", {
      target: "non_profit",
      targetId: nonProfit?.id,
      offer: offer?.priceCents,
      currency: offer?.currency,
    });
  };

  const defaultImpressionCard: ImpressionCard = {
    headline: t("titleCard"),
    title: t("donate", {
      value: formatPrice(
        (offer?.priceCents || 1000) / 100,
        currency.toLowerCase(),
      ),
    }),
    description: description || "",
    ctaText: t("button"),
    image: nonProfit?.mainImage || nonProfit?.cause?.mainImage,
    active: true,
    ctaUrl: "",
  };

  return (
    contribution && (
      <View style={S.container}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={openYouTubeVideo}
          activeOpacity={0.8}
          style={S.imageContainer}
        >
          <Image
            style={S.image}
            source={{
              uri: impressionCard ? imageUri : defaultImpressionCard.image,
            }}
            accessibilityIgnoresInvertColors
          />
          {impressionCard?.videoUrl && (
            <View style={S.playButton}>
              <View style={S.playButtonInner} />
            </View>
          )}
        </TouchableOpacity>
        <View style={[S.textContainer]}>
          <Text style={S.headline}>
            {impressionCard?.headline
              ? impressionCard.headline
              : defaultImpressionCard.headline}
          </Text>

          <Text style={S.title}>
            {impressionCard?.title
              ? impressionCard.title
              : defaultImpressionCard.title}
          </Text>

          <Text style={S.description}>
            {impressionCard?.description
              ? impressionCard.description
              : description}
          </Text>

          <Button
            onPress={impressionCard ? openLink : checkoutLink}
            text={
              impressionCard?.ctaText
                ? impressionCard.ctaText
                : defaultImpressionCard.ctaText
            }
            backgroundColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral10}
          />
        </View>
      </View>
    )
  );
}
