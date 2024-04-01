import { View } from "react-native";
import { useCallback } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useStatistics } from "@ribon.io/shared/hooks";
import { useTranslation } from "react-i18next";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { Currencies } from "@ribon.io/shared/types";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "types/enums/Languages";
import ImpactCard from "../ImpactCard";
import S from "./styles";

function ImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({ userId: currentUser?.id });
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactCards",
  });
  const { currentLang } = useLanguage();
  const totalDonated = () => {
    if (currentLang === Languages.PT) {
      return formatPrice(
        userStatistics?.totalDonated?.brl || 0,
        Currencies.BRL,
      );
    } else {
      return formatPrice(
        userStatistics?.totalDonated?.usd || 0,
        Currencies.USD,
      );
    }
  };

  const impacts = useCallback(
    () => [
      {
        name: t("totalTickets"),
        impact: userStatistics?.totalTickets ?? 0,
        iconName: "confirmation_number",
      },
      {
        name: t("totalDonated"),
        impact: totalDonated(),
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
    <View>
      <View style={S.cardsContainer}>
        {impacts().map((impact: any) => renderItem(impact))}
      </View>
    </View>
  );
}

export default ImpactCards;
