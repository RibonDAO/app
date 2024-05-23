import React, { useCallback } from "react";
import { NonProfit, Story } from "@ribon.io/shared/types";
import { logEvent } from "services/analytics";
import { useNavigation } from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { FlatList } from "react-native";
import { useTranslation } from "react-i18next";
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
  const { hasTickets, ticketsCounter } = useTicketsContext();
  const { signedIn } = useCurrentUser();

  const minNumberOfTickets =
    nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
  const hasEnoughTickets = hasTickets && ticketsCounter >= minNumberOfTickets;

  const handleDonateTicketButtonPress = useCallback(() => {
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
  }, [signedIn, navigateTo, nonProfit]);

  const handleDirectDonationButtonPress = useCallback(() => {
    logEvent("donateTicketBtn_start", {
      nonProfitId: nonProfit.id,
      from: "nonprofitCard",
    });
    if (signedIn) {
      navigateTo("CheckoutScreen", {
        nonProfit,
        cause: nonProfit.cause,
        target: "non_profit",
        offer: 0,
        targetId: nonProfit.id,
      });
    } else {
      navigateTo("DonationSignInScreen", { nonProfit });
    }
  }, [signedIn, navigateTo, nonProfit]);

  type RenderItemProps = {
    item: Story | null;
    index: number;
  };

  const renderItem = useCallback(
    ({ item, index }: RenderItemProps) => {
      if (index === 0) {
        return (
          <S.NonProfitContainer isFirst>
            <CardNonProfit
              nonProfit={nonProfit}
              ticketsQuantity={minNumberOfTickets}
              buttonText={t(
                minNumberOfTickets > 1 ? "buttonTextPlural" : "buttonText",
              )}
              onButtonClick={handleDonateTicketButtonPress}
              buttonDisabled={!hasEnoughTickets}
            />
          </S.NonProfitContainer>
        );
      } else if (
        (nonProfit.stories && index === nonProfit.stories.length + 1) ||
        nonProfit.stories?.length === 0
      ) {
        return (
          <S.NonProfitContainer isLast>
            <LastCard
              nonProfit={nonProfit}
              primaryButtonClick={handleDonateTicketButtonPress}
              secondaryButtonClick={handleDirectDonationButtonPress}
            />
          </S.NonProfitContainer>
        );
      } else {
        return item ? (
          <S.NonProfitContainer>
            <CardNonProfitStories
              markdownText={item?.description}
              backgroundImage={item?.image}
            />
          </S.NonProfitContainer>
        ) : null;
      }
    },
    [
      nonProfit,
      minNumberOfTickets,
      handleDonateTicketButtonPress,
      handleDirectDonationButtonPress,
      hasEnoughTickets,
    ],
  );

  const data = nonProfit.stories?.length
    ? [null, ...nonProfit.stories, null]
    : [null, null];

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
