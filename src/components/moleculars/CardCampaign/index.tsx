import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { openInExternalBrowser, openInWebViewer } from "lib/linkOpener";
import { ImpressionCard } from "@ribon.io/shared/types";
import { useImpressionCards } from "@ribon.io/shared/hooks";
import { useImpactConversion } from "hooks/useImpactConversion";
import { useLanguage } from "contexts/languageContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import BannerEN from "./assets/bannerEN.png";
import BannerBR from "./assets/bannerBR.png";
import S from "./styles";

export type Props = {
  cardId: number | string;
};

export default function CardCampaign({ cardId }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();
  const { nonProfit, offer, contribution } = useImpactConversion();
  const { currentLang } = useLanguage();
  const { navigateTo } = useNavigation();

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = useCallback(async () => {
    try {
      const impressionCardData = await getImpressionCard(cardId);

      setImpressionCard(impressionCardData);
    } catch (e) {
      logError(e);
    }
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

    navigateTo("ClubScreen");
  };

  const defaultImpressionCard: ImpressionCard = {
    headline: t("titleCard"),
    title: t("title"),
    description: t("description") || "",
    ctaText: t("button"),
    image: currentLang === "pt-BR" ? BannerBR : BannerEN,
    active: true,
    ctaUrl: "",
  };

  const bannerImage = currentLang === "pt-BR" ? BannerBR : BannerEN;

  const imageCard = impressionCard ? { uri: imageUri } : bannerImage;

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
            source={imageCard}
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
              : t("description")}
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
