import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useContributions } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { Loader } from "rn-placeholder";
import { useCurrentUser } from "contexts/currentUserContext";
import { useRouteParams } from "hooks/useRouteParams";
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
          <EngagementSection
            totalDonors={(
              data.stats.totalDonors + data.stats.totalContributors
            ).toString()}
            totalContributors={data.stats.totalContributors.toString()}
          />
          <BoostSection totalAmountToCause={data.stats.totalAmountToCause} />
        </View>
      </View>
      <View style={S.divider} />
    </ScrollView>
  );
}

export default ContributionStatsScreen;
