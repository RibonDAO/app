import { Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import { formatDateTime } from "lib/formatters/dateFormatter";
import CardImageText from "components/moleculars/CardImageText";
import { theme } from "@ribon.io/shared/styles";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { logEvent } from "services/analytics";
import { useFocusEffect } from "@react-navigation/native";
import Button from "components/atomics/buttons/Button";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLegacyContributions } from "@ribon.io/shared/hooks";
import ImpactDonationsVector from "./ImpactDonationsVector";
import ZeroDonationsSection from "../ZeroDonationsSection";
import S from "./styles";

function CommunityDonationsImpactCards(): JSX.Element {
  const { useCommunityPersonPayments } = usePersonPayments();
  const per = 6;
  const [page, setPage] = useState(1);
  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const { data, refetch } = useCommunityPersonPayments(page, per);
  const [impactCards, setImpactCards] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useCurrentUser();
  const { legacyContributions } = useLegacyContributions(currentUser?.id);

  const impactItems = useCallback(() => data || [], [data]);
  const hasImpact =
    (impactItems() && impactItems()?.length > 0) ||
    (legacyContributions && legacyContributions?.length > 0);
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.ngoImpactCards.zeroDonationsSection",
  });

  const hasDuplicatedIds = (items: any[]) => {
    const existentIds = new Set(impactCards.map((obj: any) => obj.id));
    const newIds = items.map((obj: any) => obj.id);

    return newIds.some((id) => existentIds.has(id));
  };

  useFocusEffect(
    useCallback(() => {
      if (!data) return;

      if (data.length === 0) {
        setShowMoreVisible(false);
        return;
      }

      if (page === 1) {
        setImpactCards(data);
      } else if (!hasDuplicatedIds(data) && page > 1) {
        setImpactCards((items: any) => [...items, ...data]);
      }

      setShowMoreDisabled(false);
      if (data.length < per) setShowMoreVisible(false);

      refetch();
    }, [data, page]),
  );

  const navigateToPromotersScreen = () => {
    logEvent("giveCauseCard_click", { from: "impactEmptyState" });
    navigateTo("PromotersScreen");
  };

  const handleShowMoreClick = () => {
    setLoading(true);

    setPage(page + 1);
    setShowMoreDisabled(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function renderZeroDonationsSection() {
    if (loading) {
      return <Text />;
    } else {
      return (
        <ZeroDonationsSection
          title={t("community.title")}
          onButtonPress={navigateToPromotersScreen}
          description={t("community.description")}
          buttonText={t("community.buttonText")}
          image={<ImpactDonationsVector />}
        />
      );
    }
  }

  function renderLoadingAnimation() {
    return (
      <View style={S.loaderContainer}>
        <LoaderAnimated width={160} height={160} speed={1.5} />
      </View>
    );
  }

  const impactCardsList = () =>
    loading ? (
      renderLoadingAnimation()
    ) : (
      <View style={S.cardsContainer}>
        {impactItems()?.map((item) => (
          <View
            key={item?.id}
            style={{ marginBottom: theme.spacingNative(12) }}
          >
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

        {showMoreVisible && (
          <View style={S.showMoreButtonContainer}>
            <Button
              outline
              text={t("showMore")}
              onPress={handleShowMoreClick}
              disabled={showMoreDisabled}
            />
          </View>
        )}
      </View>
    );

  return hasImpact ? impactCardsList() : renderZeroDonationsSection();
}

export default CommunityDonationsImpactCards;
