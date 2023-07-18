import React, { useEffect } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { useContributions } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { Loader } from "rn-placeholder";
import { useCurrentUser } from "contexts/currentUserContext";
import { useRouteParams } from "hooks/useRouteParams";
import VideoSection from "screens/users/ContributionStatsScreen/VideoSection";
import Banner from "components/moleculars/Banner";
import { theme } from "@ribon.io/shared/styles";
import RibonSunLeft from "assets/images/ribon-sun-left.png";
import GiftCycleSection from "screens/users/ContributionStatsScreen/GiftCycleSection";
import EngagementSection from "./EngagementSection";
import BoostSection from "./BoostSection";
import S from "./styles";

function ContributionStatsScreen(): JSX.Element {
  const {
    params: { contributionId },
  } = useRouteParams<"ContributionStatsScreen">();
  const { currentUser } = useCurrentUser();
  const { useContributionStats } = useContributions(currentUser?.id);
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage",
  });
  useEffect(() => {
    logEvent("P24_view ");
  }, []);

  const { data } = useContributionStats(Number(contributionId));

  if (!data)
    return (
      <View style={S.container}>
        <Loader />
      </View>
    );

  const amount = data.stats.initialAmount;
  const cause = data.receiver?.name;
  return (
    <ScrollView contentContainerStyle={S.container}>
      <Text style={S.title}>{t("title", { amount, cause })}</Text>
      <View style={S.contentContainer}>
        <View style={S.containerItem}>
          <GiftCycleSection />
          <EngagementSection
            totalDonors={(
              data.stats.totalDonors + data.stats.totalContributors
            ).toString()}
            totalContributors={data.stats.totalContributors.toString()}
          />
          <View style={S.divider} />
          <BoostSection totalAmountToCause={data.stats.totalAmountToCause} />
          <View style={S.divider} />
          <VideoSection />

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
        </View>
      </View>
    </ScrollView>
  );
}

export default ContributionStatsScreen;
