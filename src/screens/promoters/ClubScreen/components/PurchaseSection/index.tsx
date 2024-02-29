import { View } from "react-native";
import usePageView from "hooks/usePageView";
import { useTranslation } from "react-i18next";
import GroupCardsCheckbox from "components/moleculars/GroupCardsCheckbox";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLanguage } from "contexts/languageContext";
import { Categories, Currencies } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { formatPrice } from "lib/formatters/currencyFormatter";

function PurchaseSection(): JSX.Element {
  usePageView("P33_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.purchaseSection",
  });
  const { currentLang } = useLanguage();

  const [currency, setCurrency] = useState<Currencies>(Currencies.BRL);

  const { offers, refetch: refetchOffers } = useOffers(
    currency,
    true,
    Categories.CLUB,
  );

  useEffect(() => {
    setCurrency(currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD);
  }, [currentLang]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  const cardsElements = offers.map((offer) => ({
    firstDescription: t("firstDescription", {
      dailyTickets: offer.plan?.dailyTickets,
    }),
    firstIconName: "confirmation_number",
    secondDescription: t("secondDescription", {
      ribons: offer.plan?.monthlyTickets,
    }),
    secondIconName: "confirmation_number",
    value: formatPrice(offer.priceValue, offer.currency),
    recurrence: t("monthly"),
  }));

  return (
    <View>
      <GroupCardsCheckbox elements={cardsElements} />
    </View>
  );
}

export default PurchaseSection;
