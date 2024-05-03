import { View } from "react-native";
import { useCallback } from "react";
import { useImpact, useLegacyImpact } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import ImpactDonationsVector from "./ImpactDonationsVector";
import NgoImpactCard from "../NgoImpactCard";
import S from "./styles";
import ZeroDonationsSection from "../ZeroDonationsSection";

function NgoImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);
  const { legacyUserImpact } = useLegacyImpact(currentUser?.id);
  const { formattedImpactText } = useFormattedImpactText();

  const impactItems = useCallback(
    () => userImpact?.filter((item) => item.impact.toString() !== "0") || [],
    [userImpact],
  );
  const hasImpact = impactItems() && impactItems()?.length > 0;
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.ngoImpactCards.zeroDonationsSection",
  });

  const navigateToCausesScreen = () => {
    navigateTo("Cause");
  };

  const impactCardsList = () => (
    <View style={S.cardsContainer}>
      {impactItems()?.map((item) => (
        <View key={item?.nonProfit?.id}>
          <NgoImpactCard
            key={item?.nonProfit.id}
            description={formattedImpactText(
              item.nonProfit,
              Number(item.impact),
              true,
              true,
            )}
            name={item?.nonProfit.name}
            icon={item?.nonProfit.logo}
          />
        </View>
      ))}
      {legacyUserImpact?.map((item) => (
        <View key={item?.legacyNonProfit?.id}>
          <NgoImpactCard
            key={item?.legacyNonProfit.id}
            description={item.totalImpact}
            name={item?.legacyNonProfit.name}
            icon={item?.legacyNonProfit.logoUrl}
            label={t("migrated") || undefined}
          />
        </View>
      ))}
    </View>
  );

  return hasImpact ? (
    impactCardsList()
  ) : (
    <ZeroDonationsSection
      title={t("ticket.title")}
      onButtonPress={navigateToCausesScreen}
      description={t("ticket.description")}
      buttonText={t("ticket.buttonText")}
      image={<ImpactDonationsVector />}
    />
  );
}

export default NgoImpactCards;
