import React, { useEffect } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("ChooseCauseScreen");
    }, 5000);
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
