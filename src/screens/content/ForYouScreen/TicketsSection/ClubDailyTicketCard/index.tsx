/* eslint-disable no-nested-ternary */
import { theme } from "@ribon.io/shared";
import PinkTicketIllustration from "assets/illustrations/PinkTicketIllustration";
import Button from "components/atomics/buttons/Button";
import ButtonNonClickable from "components/atomics/buttons/ButtonNonClickable";

import CardTicket from "components/moleculars/CardTicket";

import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useNavigation } from "hooks/useNavigation";

import { useTranslation } from "react-i18next";

export default function ClubDailyTicketCard() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.clubTicketsSection",
  });

  const hasCollected = false;

  const hasClub = false;

  const buttonTextHasClub = hasCollected
    ? t("dailyTicketCard.buttonTextCollected")
    : t("dailyTicketCard.buttonText", { value: 2 });

  const { navigateTo } = useNavigation();

  const handleButtonPress = () => {
    if (!hasClub) {
      navigateTo("ClubScreen");
    }

    // collect ticket
  };

  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketPinkIcon />,
        text: t("dailyTicketCard.subtitle", { value: 2 }),
        color: theme.colors.brand.tertiary[900],
      }}
      borderColor={theme.colors.brand.tertiary[300]}
      icon={<PinkTicketIllustration />}
    >
      {hasCollected ? (
        <ButtonNonClickable
          text={t("dailyTicketCard.buttonText")}
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
            hasClub ? buttonTextHasClub : t("dailyTicketCard.buttonTextNoClub")
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
              : hasClub
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
