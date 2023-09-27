import { View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "lib/formatters/dateFormatter";
import CardImageText from "components/moleculars/CardImageText";
import { theme } from "@ribon.io/shared/styles";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { logEvent } from "services/analytics";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useContributions,
  useLegacyContributions,
} from "@ribon.io/shared/hooks";
import { useFocusEffect } from "@react-navigation/native";
import ContributionCard from "screens/donations/CausesScreen/ContributionSection/ContributionCard";
import { useImpactConversion } from "hooks/useImpactConversion";
import ImpactDonationsVector from "./ImpactDonationsVector";
import ZeroDonationsSection from "../ZeroDonationsSection";
import S from "./styles";

function CommunityDonationsImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { useLabelableContributions } = useContributions(currentUser?.id);
  const { data, isLoading, refetch } = useLabelableContributions();
  const { legacyContributions } = useLegacyContributions(currentUser?.id);

  const { contribution, offer, nonProfit } = useImpactConversion();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const impactItems = useCallback(() => data || [], [data]);
  const hasImpact =
    (impactItems() && impactItems()?.length > 0) ||
    (legacyContributions && legacyContributions?.length > 0);
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.ngoImpactCards.zeroDonationsSection",
  });

  const navigateToPromotersScreen = () => {
    logEvent("giveCauseCard_click", { from: "impactEmptyState" });
    navigateTo("PromotersScreen");
  };

  const navigateToContributionStatsScreen = (contributionId: number) => {
    logEvent("contributionDashCta_Btn_click", {
      from: "impact_page",
    });
    navigateTo("ContributionStatsScreen", { contributionId });
  };

  function renderZeroDonationsSection() {
    return (
      <>
        <ZeroDonationsSection
          title={t("community.title")}
          onButtonPress={navigateToPromotersScreen}
          description={t("community.description")}
          buttonText={t("community.buttonText")}
          image={<ImpactDonationsVector />}
        />
        <ContributionCard
          from="impact_page"
          isCause
          cause={nonProfit?.cause}
          description={t("community.contributionDescription")}
          impact={`+${formatPrice(
            contribution?.communityValue ?? Number(offer?.priceValue ?? 0) / 5,
            "brl",
          )}`}
        />
      </>
    );
  }

  function renderLoadingAnimation() {
    return (
      <View style={S.loaderContainer}>
        <LoaderAnimated width={160} height={160} speed={1.5} />
      </View>
    );
  }

  const impactCardsList = () =>
    isLoading ? (
      renderLoadingAnimation()
    ) : (
      <View style={S.cardsContainer}>
        {impactItems()?.map((item) => (
          <View
            key={item?.id}
            style={{ marginBottom: theme.spacingNative(12) }}
          >
            <CardImageText
              subtitle={item.receiver?.name}
              title={
                item.personPayment
                  ? formatPrice(
                      item.personPayment.offer.priceValue,
                      item.personPayment.offer.currency,
                    )
                  : `${item.usdValueCents / 100} USDC`
              }
              footerText={formatDateTime(item.personPayment.paidDate)}
              subtitleStyle={S.subtitleStyle}
              titleStyle={S.titleStyle}
              text={t("increaseText") || ""}
              buttonText={t("seeDetails") || ""}
              onButtonPress={() => {
                navigateToContributionStatsScreen(item.id);
              }}
            />
          </View>
        ))}
        {legacyContributions?.map((item: any) => (
          <View
            key={item?.id}
            style={{ marginBottom: theme.spacingNative(12) }}
          >
            <CardImageText
              subtitle={t("generalReceiver") || ""}
              label={t("migrated") || ""}
              title={item.value}
              footerText={formatDateTime(item.day || "")}
              subtitleStyle={S.subtitleStyle}
              titleStyle={S.titleStyle}
            />
          </View>
        ))}
      </View>
    );

  return hasImpact ? impactCardsList() : renderZeroDonationsSection();
}

export default CommunityDonationsImpactCards;
