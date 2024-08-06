import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import CardCampaign from "components/moleculars/CardCampaign";
import { useImpactConversion } from "hooks/useImpactConversion";
import { useCallback, useEffect, useState } from "react";
import { ImpressionCard } from "@ribon.io/shared/types";
import { logError } from "services/crashReport";
import { useImpressionCards, useSubscriptions } from "@ribon.io/shared";
import S from "./styles";

export default function ImpressBannerSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impressBannerSection",
  });
  const CURRENT_CARD_ID = 1;

  const { userIsClubMember } = useSubscriptions();
  const { isClubMember } = userIsClubMember();

  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();
  const { contribution } = useImpactConversion();

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = useCallback(async () => {
    try {
      const impressionCardData = await getImpressionCard(CURRENT_CARD_ID);

      setImpressionCard(impressionCardData);
    } catch (e) {
      logError(e);
    }
  }, [CURRENT_CARD_ID]);

  useEffect(() => {
    fetchImpressionCard();
  }, []);

  function showBanner() {
    if (contribution) {
      if (!impressionCard && isClubMember) {
        return false;
      } else if (impressionCard && isClubMember) {
        return true;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  return (
    <View style={S.container}>
      {showBanner() && (
        <>
          <Text style={S.title}>{t("titleHead")}</Text>
          <CardCampaign cardId={CURRENT_CARD_ID} />
        </>
      )}
    </View>
  );
}
