import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { openInWebViewer } from "lib/linkOpener";
import { ImpressionCard } from "@ribon.io/shared/types";
import { useImpressionCards } from "@ribon.io/shared/hooks";
import { logError } from "services/crashReport";
import S from "./styles";

export type Props = {
  cardId: number | string;
};

export default function CardCampaign({ cardId }: Props): JSX.Element {
  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();

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

    openInWebViewer(impressionCard.ctaUrl);
  };

  const imageUri = useMemo<string | undefined>(
    () => impressionCard?.image || youtubeThumbnail(impressionCard?.videoUrl),
    [impressionCard],
  );

  const openYouTubeVideo = () => {
    if (impressionCard?.videoUrl) openInWebViewer(impressionCard.videoUrl);
  };

  return impressionCard ? (
    <View style={S.container}>
      {imageUri && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={openYouTubeVideo}
          activeOpacity={0.8}
          style={S.imageContainer}
        >
          <Image
            style={S.image}
            source={{
              uri: imageUri,
            }}
            accessibilityIgnoresInvertColors
          />
          {impressionCard?.videoUrl && (
            <View style={S.playButton}>
              <View style={S.playButtonInner} />
            </View>
          )}
        </TouchableOpacity>
      )}
      <View style={[S.textContainer]}>
        <Text style={S.headline}>
          {impressionCard?.headline && impressionCard.headline}
        </Text>

        <Text style={S.title}>
          {impressionCard?.title && impressionCard.title}
        </Text>

        <Text style={S.description}>
          {impressionCard?.description && impressionCard.description}
        </Text>

        <Button
          onPress={openLink}
          text={impressionCard.ctaText}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.neutral10}
        />
      </View>
    </View>
  ) : (
    <View />
  );
}
