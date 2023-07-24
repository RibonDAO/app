import React from "react";
import { View, Text } from "react-native";
import Title from "components/moleculars/Title";
import { Props as IconProps } from "components/atomics/Icon";
import Subtitle from "components/moleculars/Subtitle";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import styles from "screens/users/ContributionStatsScreen/BoostSection/styles";

type Props = {
  totalAmountToCause: string;
};

function BoostSection({ totalAmountToCause }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.boostSection",
  });
  const { brand } = theme.colors;

  const icon: IconProps = {
    type: "rounded",
    name: "volunteer_activism",
    color: theme.colors.brand.primary[600],
    size: 24,
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.titleContainer]}>
        <Title
          title={t("title")}
          icon={icon}
          secondaryColor={brand.primary[50]}
        />
      </View>
      <Text style={styles.title}>
        <Text style={styles.boost}>↑</Text> {totalAmountToCause}
      </Text>
      <Text style={styles.text}>{t("subtitle")}</Text>
      <View style={styles.tooltipCardContainer}>
        <View style={styles.innerCardContainer}>
          <View style={styles.subtitleContainer}>
            <Subtitle
              text={
                t("tip", {
                  amount: 10,
                }) || ""
              }
              icon={{
                type: "rounded",
                name: "emoji_objects",
                size: 20,
                color: theme.colors.brand.primary[800],
              }}
              color={theme.colors.brand.primary[800]}
              secondaryColor={theme.colors.brand.primary[50]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default BoostSection;
