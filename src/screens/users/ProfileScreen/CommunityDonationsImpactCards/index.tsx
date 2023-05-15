import { View } from "react-native";
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
import ImpactDonationsVector from "./ImpactDonationsVector";
import S from "./styles";
import ZeroDonationsSection from "../ZeroDonationsSection";

function CommunityDonationsImpactCards(): JSX.Element {
  const { useCommunityPersonPayments } = usePersonPayments();
  const per = 6;
  const [page, setPage] = useState(1);
  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const { data, refetch } = useCommunityPersonPayments(page, per);
  const [impactCards, setImpactCards] = useState<any>([]);

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
    logEvent("giveCauseCard_click", { from: "impactEmptyState" });
    navigateTo("PromotersScreen");
  };

  const handleShowMoreClick = () => {
    setPage(page + 1);
    setShowMoreDisabled(true);
  };

  const impactCardsList = () => (
    <View style={S.cardsContainer}>
      {impactCards?.map((item: any) => (
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
