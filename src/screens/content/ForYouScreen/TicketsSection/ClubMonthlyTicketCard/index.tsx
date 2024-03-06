/* eslint-disable no-nested-ternary */
import { theme } from "@ribon.io/shared";
import PinkBoxIllustration from "assets/illustrations/PinkBoxIllustration";
import Button from "components/atomics/buttons/Button";
import ButtonNonClickable from "components/atomics/buttons/ButtonNonClickable";

import CardTicket from "components/moleculars/CardTicket";

import TicketPinkIcon from "components/vectors/TicketPinkIcon";
import { useNavigation } from "hooks/useNavigation";

import { useTranslation } from "react-i18next";

export default function ClubMonthlyTicketCard() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.clubTicketsSection",
  });

  const hasCollected = false;
  const hasClub = true;

  const buttonTextHasClub = hasCollected
    ? t("monthlyTicketCard.buttonTextCollected")
    : t("monthlyTicketCard.buttonText", { value: 2 });

  const { navigateTo } = useNavigation();

  const handleButtonPress = () => {
    if (!hasClub) {
      navigateTo("ClubScreen");
    }

    // collect ticket
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
          text={t("monthlyTicketCard.buttonText")}
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
            hasClub
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
