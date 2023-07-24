import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import GiftDonationCycle from "assets/animations/gift-donation-cycle.gif";
import S from "./styles";

function GiftCycleSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.giftCycleSection",
  });

  return (
    <View style={S.container}>
      <View style={S.realTimeDonationContainer}>
        <Text style={S.realTimeDonationLabel}>
          {t("realTimeDonationLabel")}
        </Text>
      </View>
      <View style={S.giftCard}>
        <Image
          source={GiftDonationCycle}
          style={S.giftDonationCycleImage}
          accessibilityIgnoresInvertColors
        />
      </View>
    </View>
  );
}

export default GiftCycleSection;
