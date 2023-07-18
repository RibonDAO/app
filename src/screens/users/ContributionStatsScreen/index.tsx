import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useContributions from "hooks/apiHooks/useContributions";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { Loader } from "rn-placeholder";
import EngagementSection from "./EngagementSection";
import BoostSection from "./BoostSection";
import styles from "./styles";

function ContributionStatsScreen(): JSX.Element {
  const { contributionId } = { contributionId: 1 };
  const { useContributionStats } = useContributions();
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage",
  });
  useEffect(() => {
    logEvent("P24_view ");
  }, []);

  const { data } = useContributionStats(Number(contributionId));

  if (!data) return <Loader />;

  const amount = data.stats.initialAmount;
  const cause = data.receiver?.name;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title", { amount, cause })}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.containerItem}>
          <EngagementSection
            totalDonors={(
              data.stats.totalDonors + data.stats.totalContributors
            ).toString()}
            totalContributors={data.stats.totalContributors.toString()}
          />
          <BoostSection totalAmountToCause={data.stats.totalAmountToCause} />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

export default ContributionStatsScreen;
