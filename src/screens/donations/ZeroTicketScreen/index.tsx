import { useNavigation } from "hooks/useNavigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import ArrowLeft from "components/vectors/ArrowLeft";
import ZeroTicket from "components/vectors/ZeroTicket";
import usePageView from "hooks/usePageView";
import S from "./styles";
import ContributionCard from "../CausesScreen/ContributionSection/ContributionCard";

export default function ZeroTicketScreen() {
  usePageView("P14_view");
  const { t } = useTranslation("translation", {
    keyPrefix: "content.zeroTicketScreen",
  });

  const { navigateTo } = useNavigation();

  const handleBackButtonClick = () => {
    navigateTo("CausesScreen");
  };

  return (
    <>
      <View style={S.arrow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleBackButtonClick}
          testID="arrow-back-button"
        >
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <View style={S.container}>
        <View style={S.content}>
          <ZeroTicket />
          <View style={S.textContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <Text style={S.subtitle}>{t("subtitle")}</Text>
          </View>
        </View>
        <ContributionCard from="zeroTickes_modal" />
      </View>
    </>
  );
}
