import Banner from "components/moleculars/Banner";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "services/analytics";
import { Linking, View } from "react-native";
import RibonSunLeft from "assets/images/ribon-sun-left.png";
import React from "react";
import { useTranslation } from "react-i18next";
import S from "../styles";

function OpinionSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage",
  });

  return (
    <View style={S.bannerContainer}>
      <Banner
        icon={{
          name: "support_agent",
          color: theme.colors.neutral[900],
          type: "rounded",
          size: 20,
        }}
        title={{
          text: t("supportSection.title"),
          color: theme.colors.neutral[900],
        }}
        text={t("supportSection.text").toString()}
        textColor={theme.colors.neutral[800]}
        arrowLinkColor={theme.colors.brand.secondary[800]}
        onArrowClick={() => {
          logEvent("P24_opinionCardBtn_click");
          Linking.openURL(
            "https://api.whatsapp.com/send/?phone=554896605461&text=Oi%2C+quero+compartilhar+minha+opini%C3%A3o+:)&type=phone_number&app_absent=0",
          );
        }}
        cardBackground={RibonSunLeft}
      />
    </View>
  );
}

export default OpinionSection;
