/* eslint-disable no-nested-ternary */
import { TicketsCategories, theme } from "@ribon.io/shared";
import PinkTicketIllustration from "assets/illustrations/PinkTicketIllustration";
import Button from "components/atomics/buttons/Button";
import ButtonNonClickable from "components/atomics/buttons/ButtonNonClickable";

import CardTicket from "components/moleculars/CardTicket";

import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "hooks/useTickets";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

type Props = {
  tickets?: number;
  isMember?: boolean;
  refetchTickets: () => void;
  plan?: number;
  setUnauthorizedModalVisible: (value: boolean) => void;
};
export default function ClubDailyTicketCard({
  tickets = 0,
  isMember,
  refetchTickets,
  plan,
  setUnauthorizedModalVisible,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.clubTicketsSection",
  });

  const hasCollected = isMember && tickets === 0;

  const buttonText =
    tickets > 1
      ? t("dailyTicketCard.buttonTextPlural", { value: tickets })
      : t("dailyTicketCard.buttonText", { value: tickets });

  const buttonTextHasClub = hasCollected
    ? t("dailyTicketCard.buttonTextCollected")
    : buttonText;

  const { navigateTo } = useNavigation();

  const { handleCollectByClub } = useTickets();

  const { isAuthenticated } = useAuthentication();

  const handleButtonPress = async () => {
    if (!isMember) {
      navigateTo("ClubScreen");
      logEvent("clubCTA_click", { from: "clubDailyTicket_card" });
    } else if (!isAuthenticated()) {
      setUnauthorizedModalVisible(true);
    } else {
      await handleCollectByClub({
        category: TicketsCategories.DAILY,
        onSuccess: () =>
          logEvent("collectDailyClubTickets_click", {
            amount: tickets,
          }),
      });

      refetchTickets();
    }
  };

  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: plan
          ? t("dailyTicketCard.subtitleWithValue", { value: plan })
          : t("dailyTicketCard.subtitle"),
        color: theme.colors.brand.tertiary[900],
      }}
      borderColor={theme.colors.brand.tertiary[300]}
      icon={<PinkTicketIllustration />}
    >
      {hasCollected ? (
        <ButtonNonClickable
          text={t("dailyTicketCard.buttonTextCollected")}
          textColor={theme.colors.brand.tertiary[600]}
          borderColor={theme.colors.brand.tertiary[50]}
          backgroundColor={theme.colors.brand.tertiary[50]}
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
            isMember ? buttonTextHasClub : t("dailyTicketCard.buttonTextNoClub")
          }
          textColor={theme.colors.neutral10}
          borderColor={theme.colors.brand.tertiary[600]}
          backgroundColor={theme.colors.brand.tertiary[600]}
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
