import React, { useEffect } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useSound from "hooks/useSound";
import usePageView from "hooks/usePageView";
import donationDoneSound from "./assets/donation-done.mp3";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  usePageView("P7_view");
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { playSound } = useSound();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("PostDonationScreen", {
        nonProfit,
        cause: nonProfit.cause,
      });
    }, 4000);
  }, []);

  useEffect(() => {
    playSound(donationDoneSound);
  }, []);

  return (
    <DoneScreenTemplate
      image={nonProfit.confirmationImage || nonProfit.mainImage}
      imageDescription={
        nonProfit.confirmationImageDescription || nonProfit.mainImageDescription
      }
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
