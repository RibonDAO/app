import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useContributions } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { Loader } from "rn-placeholder";
import { useCurrentUser } from "contexts/currentUserContext";
import { useRouteParams } from "hooks/useRouteParams";
import VideoSection from "screens/users/ContributionStatsScreen/VideoSection";
import GiftCycleSection from "screens/users/ContributionStatsScreen/GiftCycleSection";
import usePageView from "hooks/usePageView";
import OpinionSection from "screens/users/ContributionStatsScreen/OpinionSection";
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
  usePageView("P24_view");

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
          <OpinionSection />
        </View>
      </View>
    </ScrollView>
  );
}

export default ContributionStatsScreen;
