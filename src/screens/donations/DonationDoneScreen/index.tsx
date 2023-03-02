import React, { useEffect } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useSound from "hooks/useSound";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { playSound } = useSound();

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
