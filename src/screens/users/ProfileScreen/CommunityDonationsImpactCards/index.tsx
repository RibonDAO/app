import { View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import { formatDateTime } from "lib/formatters/dateFormatter";
import CardImageText from "components/moleculars/CardImageText";
import { theme } from "@ribon.io/shared/styles";
import { formatPrice } from "lib/formatters/currencyFormatter";
import ImpactDonationsVector from "./ImpactDonationsVector";
import S from "./styles";
import ZeroDonationsSection from "../ZeroDonationsSection";
import { logEvent } from "services/analytics";

function CommunityDonationsImpactCards(): JSX.Element {
  const { useCommunityPersonPayments } = usePersonPayments();

  const { data } = useCommunityPersonPayments(1, 6);

  const impactItems = useCallback(() => data || [], [data]);
  const hasImpact = impactItems() && impactItems()?.length > 0;
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen.ngoImpactCards.zeroDonationsSection",
  });

  const navigateToPromotersScreen = () => {
    logEvent("giveCauseCard_click", { from: "impactEmptystate"});
    navigateTo("PromotersScreen");
  };

  const impactCardsList = () => (
    <View style={S.cardsContainer}>
      {impactItems()?.map((item) => (
        <View key={item?.id} style={{ marginBottom: theme.spacingNative(12) }}>
          <CardImageText
            subtitle={item.receiver.name}
            title={
              item.offer
                ? formatPrice(item.offer.priceValue, item.offer.currency)
                : `${item.amountCents / 100} USDC`
            }
            footerText={formatDateTime(item.paidDate)}
            subtitleStyle={S.subtitleStyle}
            titleStyle={S.titleStyle}
          />
        </View>
      ))}
    </View>
  );

  return hasImpact ? (
    impactCardsList()
  ) : (
    <ZeroDonationsSection
      title={t("community.title")}
      onButtonPress={navigateToPromotersScreen}
      description={t("community.description")}
      buttonText={t("community.buttonText")}
      image={<ImpactDonationsVector />}
    />
  );
}

export default CommunityDonationsImpactCards;
