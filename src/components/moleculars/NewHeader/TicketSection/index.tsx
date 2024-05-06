import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { useTicketsContext } from "contexts/ticketsContext";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import Animated, { Keyframe } from "react-native-reanimated";
import NewTicketAnimation from "components/atomics/animations/NewTicketAnimation";
import { perform } from "lib/timeoutHelpers";
import * as S from "../styles";

const enteringKeyframes = new Keyframe({
  0: { transform: [{ translateY: 200 }] },
  100: { transform: [{ translateY: 0 }] },
});

const exitingKeyframes = new Keyframe({
  0: { transform: [{ translateY: 0 }] },
  100: { transform: [{ translateY: -200 }] },
});

const MemoizedTicketCounter = React.memo(
  ({ ticketCount }: { ticketCount: number }) => (
    <S.TicketCountWrapper key={ticketCount}>
      <Animated.View
        entering={enteringKeyframes.duration(300).delay(100)}
        exiting={exitingKeyframes.duration(300)}
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <S.TicketCounterText>{ticketCount}</S.TicketCounterText>
        <Icon
          type="outlined"
          name="confirmation_number"
          size={24}
          color={theme.colors.neutral10}
        />
      </Animated.View>
    </S.TicketCountWrapper>
  ),
);

function TicketSection(): JSX.Element {
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
    navigateTo("TabNavigator", { screen: "EarnTicketsScreen" });
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

    perform(() => setShowToast(true)).in(1000);
  }, [ticketDiff]);

  useEffect(() => {
    const resetToast = () => {
      setTicketDiff(0);
      setShowToast(false);
    };

    if (showToast) perform(resetToast).in(1000);
  }, [showToast]);

  return (
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
  );
}

export default TicketSection;
