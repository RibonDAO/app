import React from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit } = route.params;
  const { popNavigation } = useNavigation();

  return (
    <DoneScreenTemplate
      image={nonProfit.mainImage}
      title={t("title") || ""}
      description={`
      You donated ${nonProfit.impactByTicket} ${nonProfit.impactDescription} to ${nonProfit.name}.`}
      buttonTitle={t("buttonText") || ""}
      onButtonPress={() => popNavigation()}
    />
  );
}
