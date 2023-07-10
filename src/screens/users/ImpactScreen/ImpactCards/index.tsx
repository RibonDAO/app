import { View } from "react-native";
import { useCallback } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { Currencies } from "@ribon.io/shared/types";
import ImpactCard from "../ImpactCard";
import S from "./styles";
import ImpactMigrationNotification from "../ImpactMigrationNotification";

function ImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({ userId: currentUser?.id });
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactCards",
  });

  // TODO: dynamic currency on totaldonated
  const impacts = useCallback(
    () => [
      {
        name: t("totalTickets"),
        impact: userStatistics?.totalTickets ?? 0,
        iconName: "confirmation_number",
      },
      {
        name: t("totalDonated"),
        impact: formatPrice(
          userStatistics?.totalDonated?.brl || 0,
          Currencies.BRL,
        ),
        iconName: "monetization_on",
      },
      {
        name: t("totalNonProfits"),
        impact: userStatistics?.totalNonProfits ?? 0,
        iconName: "diversity_4",
      },
      {
        name: t("totalCauses"),
        impact: userStatistics?.totalCauses ?? 0,
        iconName: "interests",
      },
    ],
    [userStatistics],
  );

  const renderItem = ({
    name,
    impact,
    iconName,
  }: {
    name: string;
    impact: number;
    iconName: string;
  }) => (
    <ImpactCard
      key={name}
      onPress={() => {}}
      description={name}
      impact={impact}
      iconName={iconName}
    />
  );

  return (
    <View style={S.cardsContainer}>
      <ImpactMigrationNotification />
      {impacts().map((impact: any) => renderItem(impact))}
    </View>
  );
}

export default ImpactCards;
