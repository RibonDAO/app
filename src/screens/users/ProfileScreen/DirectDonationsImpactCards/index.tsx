import { View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import { theme } from "@ribon.io/shared/styles";
import DirectDonationCard from "screens/users/ProfileScreen/DirectDonationsImpactCards/DirectDonationCard";
import ImpactDonationsVector from "./ImpactDonationsVector";
import S from "./styles";
import ZeroDonationsSection from "../ZeroDonationsSection";
import { logEvent } from "services/analytics";

function DirectDonationsImpactCards(): JSX.Element {
  const { useDirectPersonPayments } = usePersonPayments();

  const { data } = useDirectPersonPayments(1, 6);

  const impactItems = useCallback(() => data || [], [data]);
  const hasImpact = impactItems() && impactItems()?.length > 0;
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen.ngoImpactCards.zeroDonationsSection",
  });

  const navigateToPromotersScreen = () => {
    logEvent("giveNonProfitCard_click", { from: "impactEmptystate"});
    navigateTo("PromotersScreen", { isInCommunity: false });
  };

  const impactCardsList = () => (
    <View style={S.cardsContainer}>
      {impactItems()?.map((item) => (
        <View key={item?.id} style={{ marginBottom: theme.spacingNative(12) }}>
          <DirectDonationCard personPayment={item} />
        </View>
      ))}
    </View>
  );

  return hasImpact ? (
    impactCardsList()
  ) : (
    <ZeroDonationsSection
      title={t("direct.title")}
      onButtonPress={navigateToPromotersScreen}
      description={t("direct.description")}
      buttonText={t("direct.buttonText")}
      image={<ImpactDonationsVector />}
    />
  );
}

export default DirectDonationsImpactCards;
