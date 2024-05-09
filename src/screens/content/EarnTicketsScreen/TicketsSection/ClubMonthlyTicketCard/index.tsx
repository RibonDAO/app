/* eslint-disable no-nested-ternary */
import { theme, TicketsCategories } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import ButtonNonClickable from "components/atomics/buttons/ButtonNonClickable";
import CardTicket from "components/moleculars/CardTicket";
import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { logEvent } from "services/analytics";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  tickets?: number;
  isMember?: boolean;
  refetchTickets: () => void;
  plan?: number;
  setUnauthorizedModalVisible: (value: boolean) => void;
};
export default function ClubMonthlyTicketCard({
  tickets = 0,
  isMember,
  refetchTickets,
  plan,
  setUnauthorizedModalVisible,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.clubTicketsSection",
  });

  const hasCollected = isMember && tickets === 0;

  const buttonText =
    tickets > 1
      ? t("monthlyTicketCard.buttonTextPlural", { value: tickets })
      : t("monthlyTicketCard.buttonText", { value: tickets });

  const buttonTextHasClub = hasCollected
    ? t("monthlyTicketCard.buttonTextCollected")
    : buttonText;

  const { navigateTo } = useNavigation();

  const { handleCollectByClub } = useTickets();

  const { isAuthenticated } = useAuthentication();

  const handleButtonPress = async () => {
    if (!isMember) {
      navigateTo("ClubScreen");
      logEvent("clubCTA_click", { from: "clubMonthlyTicket_card" });
    } else if (!isAuthenticated()) {
      setUnauthorizedModalVisible(true);
    } else {
      await handleCollectByClub({
        category: TicketsCategories.MONTHLY,
        onSuccess: () =>
          logEvent("ticketCollected", {
            amount: tickets,
            from: "monthlyClub",
          }),
      });
      refetchTickets();
    }
  };

  useEffect(() => {
    if (!isMember) {
      logEvent("clubCTA_view", { from: "clubMonthlyTicket_card" });
    }
  }, []);

  return (
    <CardTicket
      title={t("monthlyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: plan
          ? t("monthlyTicketCard.subtitleWithValue", { value: plan })
          : t("monthlyTicketCard.subtitle"),
        color: theme.colors.brand.tertiary[900],
      }}
      background="ticketBox"
    >
      {hasCollected ? (
        <ButtonNonClickable
          text={t("monthlyTicketCard.buttonTextCollected")}
          textColor={theme.colors.brand.tertiary[600]}
          borderColor={theme.colors.brand.tertiary[100]}
          backgroundColor={theme.colors.brand.tertiary[100]}
          leftIcon={{
            name: "check",
            color: theme.colors.brand.tertiary[600],
            type: "outlined",
            size: 24,
          }}
        />
      ) : (
        <Button
          text={
            isMember
              ? buttonTextHasClub
              : t("monthlyTicketCard.buttonTextNoClub")
          }
          textColor={theme.colors.neutral10}
          borderColor={theme.colors.brand.tertiary[600]}
          backgroundColor={theme.colors.brand.tertiary[600]}
          customStyles={{ borderRadius: 12 }}
          leftIcon={
            hasCollected
              ? {
                  name: "check",
                  color: hasCollected
                    ? theme.colors.brand.tertiary[600]
                    : theme.colors.neutral10,
                  type: "outlined",
                  size: 24,
                }
              : isMember
              ? undefined
              : {
                  name: "lock",
                  color: hasCollected
                    ? theme.colors.brand.tertiary[600]
                    : theme.colors.neutral10,
                  type: "outlined",
                  size: 24,
                }
          }
          onPress={handleButtonPress}
        />
      )}
    </CardTicket>
  );
}
