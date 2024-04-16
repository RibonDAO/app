import { useFocusEffect } from "@react-navigation/native";
import { useFirstAccessToIntegration } from "@ribon.io/shared/hooks";
import { useIntegrationContext } from "contexts/integrationContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { useTickets } from "hooks/useTickets";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import RibonLogo from "../FirstSection/assets/logo-ribon";
import Ticket from "./assets/ticket";
import * as S from "./styles";

function SecondSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.v2.secondSection",
  });

  const { hasReceivedTicketToday, handleCanCollect } = useTickets();
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(currentIntegrationId);
  const { refetchTickets } = useTicketsContext();

  async function receiveTicket() {
    const canCollect = await handleCanCollect();
    const receivedTicketToday = await hasReceivedTicketToday();
    if (canCollect) {
      if (!receivedTicketToday) {
        await setLocalStorageItem(
          RECEIVED_TICKET_AT_KEY,
          Date.now().toString(),
        );
        await setLocalStorageItem(
          RECEIVED_TICKET_FROM_INTEGRATION,
          currentIntegrationId?.toLocaleString(),
        );
        logEvent("receiveTicket_view", { from: "receivedTickets_toast" });
      }
    } else {
      refetchTickets();
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (isFirstAccessToIntegration !== undefined) {
        receiveTicket();
      }
    }, [isFirstAccessToIntegration, externalId]),
  );

  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <RibonLogo />
        </S.LogoContainer>
      </S.Header>
      <S.TextContainer>
        <Ticket />
        <S.Title>{t("title")}</S.Title>
        <S.Description>{t("description")}</S.Description>
      </S.TextContainer>
    </S.Container>
  );
}

export default SecondSection;
