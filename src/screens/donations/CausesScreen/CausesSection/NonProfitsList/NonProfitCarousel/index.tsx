import React, { useEffect, useState } from "react";
import { Currencies, NonProfit, Story } from "@ribon.io/shared/types";
import { logEvent } from "services/analytics";
import { useNavigation } from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { Image as ExpoImage } from "expo-image";
import { FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "contexts/languageContext";
import { useStories } from "@ribon.io/shared/hooks";
import { logError } from "services/crashReport";
import CardNonProfit from "./components/CardNonProfit";
import CardNonProfitStories from "./components/CardNonProfitStories";
import * as S from "./styles";
import LastCard from "./components/LastCard";

export type Props = {
  nonProfit: NonProfit;
};

function NonProfitCarousel({ nonProfit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });
  const { navigateTo } = useNavigation();
  const { fetchNonProfitStories } = useStories();
  const [stories, setStories] = useState<Story[]>([]);
  const { hasTickets, ticketsCounter } = useTicketsContext();
  const { signedIn } = useCurrentUser();
  const { currentLang } = useLanguage();

  const currentCurrency =
    currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD;

  const minNumberOfTickets =
    nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
  const hasEnoughTickets = hasTickets && ticketsCounter >= minNumberOfTickets;

  const loadStories = async () => {
    try {
      const nonProfitStories = await fetchNonProfitStories(nonProfit.id);
      ExpoImage.prefetch(nonProfitStories.map((story) => story.image));
      if (nonProfitStories.length === 0) return;
      setStories(nonProfitStories);
    } catch (e) {
      logError(e);
    }
  };

  const handleDonateTicketButtonPress = () => {
    logEvent("donateTicketBtn_start", {
      nonProfitId: nonProfit.id,
      from: "nonprofitCard",
    });
    if (signedIn) {
      navigateTo("SelectTicketsScreen", {
        nonProfit,
        cause: nonProfit.cause,
      });
    } else {
      navigateTo("DonationSignInScreen", { nonProfit });
    }
  };

  const handleDirectDonationButtonPress = () => {
    logEvent("giveNgoBtn_start", {
      nonProfitId: nonProfit.id,
      from: "nonprofitCard",
    });
    navigateTo("CheckoutScreen", {
      nonProfit,
      cause: nonProfit.cause,
      target: "non_profit",
      targetId: nonProfit.id,
      offer: 0,
      currency: currentCurrency,
    });
  };

  useEffect(() => {
    loadStories();
  }, [nonProfit]);

  type RenderItemProps = {
    item: Story | null;
    index: number;
  };

  const buttonText = () => {
    if (!hasEnoughTickets) {
      return "notEnoughTickets";
    } else if (minNumberOfTickets > 1) {
      return "buttonTextPlural";
    } else {
      return "buttonText";
    }
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    if (index === 0) {
      return (
        <S.NonProfitContainer isFirst>
          <CardNonProfit
            nonProfit={nonProfit}
            ticketsQuantity={minNumberOfTickets}
            buttonText={t(buttonText())}
            onButtonClick={handleDonateTicketButtonPress}
            buttonDisabled={!hasEnoughTickets}
          />
        </S.NonProfitContainer>
      );
    } else if (
      (stories && index === stories.length + 1) ||
      stories?.length === 0
    ) {
      return (
        <S.NonProfitContainer isLast>
          <LastCard
            nonProfit={nonProfit}
            primaryButtonText={t(buttonText())}
            primaryButtonClick={handleDonateTicketButtonPress}
            secondaryButtonClick={handleDirectDonationButtonPress}
            primaryButtonDisabled={!hasEnoughTickets}
          />
        </S.NonProfitContainer>
      );
    } else if (item) {
      return (
        <S.NonProfitContainer>
          <CardNonProfitStories
            markdownText={item.description}
            backgroundImage={item.image}
          />
        </S.NonProfitContainer>
      );
    } else {
      return null;
    }
  };

  const data = stories?.length ? [null, ...stories, null] : [null, null];

  return (
    <S.Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </S.Container>
  );
}

export default React.memo(NonProfitCarousel);
