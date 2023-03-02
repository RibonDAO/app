import React, { useCallback, useEffect, useState } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { Audio } from 'expo-av';

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const [sound, setSound] = useState<any>();
  const { nonProfit } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/donation-done.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    setTimeout(() => {
      navigateTo("ChooseCauseScreen");
    }, 5000);
  }, []);

  useEffect(() => {
    playSound();
  }, []);

  return (
    <DoneScreenTemplate
      image={nonProfit.mainImage}
      title={t("title") || ""}
      description={t("description") || ""}
      highlightedDescription={formattedImpactText(
        nonProfit,
        undefined,
        false,
        false,
      )}
    />
  );
}
