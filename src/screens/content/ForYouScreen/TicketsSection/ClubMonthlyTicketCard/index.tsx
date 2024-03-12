/* eslint-disable no-nested-ternary */
import { theme, useUserTickets, TicketsCategories } from "@ribon.io/shared";
import IsMember from "@ribon.io/shared/types/apiResponses/IsMember";
import PinkBoxIllustration from "assets/illustrations/PinkBoxIllustration";
import Button from "components/atomics/buttons/Button";
import ButtonNonClickable from "components/atomics/buttons/ButtonNonClickable";

import CardTicket from "components/moleculars/CardTicket";

import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { PLATFORM } from "utils/constants/Application";

type Props = {
  tickets?: number;
  isMember?: IsMember;
  refetchTickets: () => void;
};
export default function ClubMonthlyTicketCard({
  tickets = 0,
  isMember,
  refetchTickets,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.clubTicketsSection",
  });

  const hasCollected = isMember && tickets === 0;

  const buttonTextHasClub = hasCollected
    ? t("monthlyTicketCard.buttonTextCollected")
    : t("monthlyTicketCard.buttonText", { value: tickets });

  const { navigateTo } = useNavigation();

  const { collectByClub } = useUserTickets();

  const handleButtonPress = async () => {
    if (!isMember) {
      navigateTo("ClubScreen");
    } else {
      await collectByClub(PLATFORM, TicketsCategories.MONTHLY);
      refetchTickets();
    }
  };

  return (
    <CardTicket
      title={t("monthlyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: t("monthlyTicketCard.subtitle", { value: 2 }),
        color: theme.colors.brand.tertiary[900],
      }}
      borderColor={theme.colors.brand.tertiary[300]}
      icon={<PinkBoxIllustration />}
    >
      {hasCollected ? (
        <ButtonNonClickable
          text={t("monthlyTicketCard.buttonTextCollected")}
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
            isMember
              ? buttonTextHasClub
              : t("monthlyTicketCard.buttonTextNoClub")
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
