import { View } from "react-native";
import usePageView from "hooks/usePageView";
import { useTranslation } from "react-i18next";
import GroupCardsCheckbox from "components/moleculars/GroupCardsCheckbox";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLanguage } from "contexts/languageContext";
import { Categories, Currencies } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { formatPrice } from "lib/formatters/currencyFormatter";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import S from "./styles";

type Props = {
  setCurrentOffer: (element: any) => void;
};

function PurchaseSection({ setCurrentOffer }: Props): JSX.Element {
  usePageView("P33_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.purchaseSection",
  });
  const { currentLang } = useLanguage();

  const [currency, setCurrency] = useState<Currencies>(Currencies.BRL);
  const [currentElement, setCurrentElement] = useState(0);

  const {
    offers,
    isLoading,
    refetch: refetchOffers,
  } = useOffers(currency, true, Categories.CLUB);

  useEffect(() => {
    setCurrency(currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD);
  }, [currentLang]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    setCurrentOffer(offers[currentElement]);
  }, [currentElement]);

  const middleElementIndex = Math.floor(offers.length / 2);

  const cardsElements = offers.map((offer) => ({
    firstDescription: t("firstDescription", {
      dailyTickets: offer?.plan?.dailyTickets,
    }),
    firstIconName: "confirmation_number",
    secondDescription: t("secondDescription", {
      monthlyTickets: offer?.plan?.monthlyTickets,
    }),
    secondIconName: "inventory_2",
    value: formatPrice(offer?.priceValue, offer.currency),
    recurrence: t("recurrenceMonthly"),
    tagText: offers[middleElementIndex] === offer ? t("tagText") : undefined,
  }));

  function renderLoadingAnimation() {
    return (
      <View style={S.loaderContainer}>
        <LoaderAnimated width={160} height={160} speed={1.5} />
      </View>
    );
  }

  function renderGroupCardsCheckbox(): JSX.Element {
    return isLoading ? (
      renderLoadingAnimation()
    ) : (
      <GroupCardsCheckbox
        elements={cardsElements}
        setCurrentElement={setCurrentElement}
        indexSelected={middleElementIndex}
      />
    );
  }

  return renderGroupCardsCheckbox();
}

export default PurchaseSection;
