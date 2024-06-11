import { useTranslation } from "react-i18next";

import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";

import { useNavigation } from "hooks/useNavigation";
import { useTicketsContext } from "contexts/ticketsContext";
import { logEvent } from "services/analytics";
import HeaderTemplate from "components/moleculars/HeaderTemplate";

import React, { useCallback, useEffect, useState } from "react";
import NewTicketAnimation from "components/atomics/animations/NewTicketAnimation";
import { perform } from "lib/timeoutHelpers";
import { View } from "react-native";
import NotificationPaymentFailed from "../NotificationPaymentFailed";
import RibonLogo from "./assets/RibonLogo";
import * as S from "./styles";

const MemoizedTicketCounter = React.memo(
  ({ ticketCount }: { ticketCount: number }) => (
    <S.TicketCountWrapper key={ticketCount}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <S.TicketCounterText>{ticketCount}</S.TicketCounterText>
        <Icon
          type="outlined"
          name="confirmation_number"
          size={24}
          color={theme.colors.neutral10}
        />
      </View>
    </S.TicketCountWrapper>
  ),
);

function Header(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "newHeader",
  });

  const { navigateTo, popNavigation } = useNavigation();
  const { ticketsCounter: tickets } = useTicketsContext();
  const [ticketCount, setTicketCount] = useState(tickets);
  const [showToast, setShowToast] = useState(false);
  const [ticketDiff, setTicketDiff] = useState(0);

  const handleToggleTooltip = () => {
    logEvent("earnTicketsCTA_click");

    navigateTo("AboutTicketsScreen", {
      title: t("aboutTicketsTitle"),
      from: "ticketsTooltip",
      buttonText: t("aboutTicketsButtonText"),
      buttonOnPress: () => popNavigation(),
    });
  };

  const handleToggleEarnTickets = () => {
    logEvent("aboutTicketTooltip_click");
    navigateTo("EarnTicketsScreen");
  };

  const renderTicketCounter = useCallback(
    () => <MemoizedTicketCounter ticketCount={ticketCount} />,
    [ticketCount],
  );

  useEffect(() => {
    if (tickets !== ticketCount) {
      if (tickets > ticketCount) {
        setTicketDiff(tickets - ticketCount);
      }
      setTicketCount(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (ticketDiff <= 0) return;

    perform(() => setShowToast(true)).in(500);
  }, [ticketDiff]);

  useEffect(() => {
    const resetToast = () => {
      setTicketDiff(0);
      setShowToast(false);
    };

    if (showToast) perform(resetToast).in(2000);
  }, [showToast]);

  return (
    <HeaderTemplate>
      <S.InfoContainer>
        <RibonLogo />
        <S.TitleContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{t("description")}</S.Description>
        </S.TitleContainer>
      </S.InfoContainer>
      <NotificationPaymentFailed />
      <S.TicketContainer>
        <S.TextContainer>
          <S.TicketText>{t("myTickets")}</S.TicketText>
          <S.IconContainer
            accessibilityRole="button"
            onPress={handleToggleTooltip}
          >
            <Icon
              type="outlined"
              name="help"
              size={20}
              color={theme.colors.neutral10}
            />
          </S.IconContainer>
        </S.TextContainer>
        <S.TicketCounter>{renderTicketCounter()}</S.TicketCounter>
        {showToast && <NewTicketAnimation count={ticketDiff} />}
        <S.TicketLink onPress={handleToggleEarnTickets}>
          {t("earnMoreTickets")}
        </S.TicketLink>
      </S.TicketContainer>
    </HeaderTemplate>
  );
}

export default Header;
