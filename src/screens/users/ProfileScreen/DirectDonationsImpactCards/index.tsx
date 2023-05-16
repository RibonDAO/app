import { Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import { theme } from "@ribon.io/shared/styles";
import DirectDonationCard from "screens/users/ProfileScreen/DirectDonationsImpactCards/DirectDonationCard";
import { logEvent } from "services/analytics";
import { useFocusEffect } from "@react-navigation/native";
import Button from "components/atomics/buttons/Button";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import ImpactDonationsVector from "./ImpactDonationsVector";
import S from "./styles";
import ZeroDonationsSection from "../ZeroDonationsSection";

function DirectDonationsImpactCards(): JSX.Element {
  const { useDirectPersonPayments } = usePersonPayments();
  const per = 2;
  const [page, setPage] = useState(1);
  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const { data, refetch } = useDirectPersonPayments(page, per);
  const [impactCards, setImpactCards] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const impactItems = useCallback(() => data || [], [data]);
  const hasImpact = impactItems() && impactItems()?.length > 0;
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen.ngoImpactCards.zeroDonationsSection",
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
    logEvent("giveNonProfitCard_click", { from: "impactEmptyState" });
    navigateTo("PromotersScreen", { isInCommunity: false });
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
          title={t("direct.title")}
          onButtonPress={navigateToPromotersScreen}
          description={t("direct.description")}
          buttonText={t("direct.buttonText")}
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
        {impactCards?.map((item: any) => (
          <View
            key={item?.id}
            style={{ marginBottom: theme.spacingNative(12) }}
          >
            <DirectDonationCard personPayment={item} />
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

export default DirectDonationsImpactCards;
