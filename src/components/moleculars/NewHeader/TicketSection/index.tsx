import { useTranslation } from "react-i18next";

import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";

import { useNavigation } from "hooks/useNavigation";
import { useTicketsContext } from "contexts/ticketsContext";
import { logEvent } from "services/analytics";
import * as S from "../styles";

function TicketSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "newHeader",
  });

  const { navigateTo, popNavigation } = useNavigation();
  const { ticketsCounter: tickets } = useTicketsContext();

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
      <S.TicketCounter>
        <S.TicketCounterText>{tickets}</S.TicketCounterText>
        <Icon
          type="outlined"
          name="confirmation_number"
          size={24}
          color={theme.colors.neutral10}
        />
      </S.TicketCounter>
      <S.TicketLink onPress={handleToggleEarnTickets}>
        {t("earnMoreTickets")}
      </S.TicketLink>
    </S.TicketContainer>
  );
}

export default TicketSection;
