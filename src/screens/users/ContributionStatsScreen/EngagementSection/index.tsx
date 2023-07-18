import React from "react";
import { View } from "react-native";
import Card from "components/moleculars/Card";
import Title from "components/moleculars/Title";
import { Props as IconProps } from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Data from "components/moleculars/Data";
import styles from "./styles";

type Props = {
  totalDonors: string;
  totalContributors: string;
};

function EngagementSection({
  totalDonors,
  totalContributors,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.engagementSection",
  });
  const { brand } = theme.colors;

  const icon: IconProps = {
    type: "rounded",
    name: "confirmation_number",
    color: brand.tertiary[800],
    size: 24,
  };

  return (
    <Card border backgroundColor="transparent">
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title
            title={t("title")}
            icon={icon}
            secondaryColor={brand.tertiary[50]}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.dataContainer}>
            <Data
              data={totalDonors}
              label={t("numberOfTicketDonors").toString()}
              color={brand.tertiary[800]}
            />
          </View>
          <View style={styles.dataContainer}>
            <Data
              data={totalContributors}
              label={t("numberOfContributorsDonors").toString()}
              color={brand.tertiary[800]}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}

export default EngagementSection;
