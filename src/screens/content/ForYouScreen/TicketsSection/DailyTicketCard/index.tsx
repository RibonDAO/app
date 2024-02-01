import { theme } from "@ribon.io/shared";
import TicketIllustration from "assets/illustrations/TicketIllustration";
import Button from "components/atomics/buttons/Button";
import CardTicket from "components/moleculars/CardTicket";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import { useTranslation } from "react-i18next";

export default function DailyTicketCard() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.ticketsSection",
  });

  return (
    <CardTicket
      title={t("dailyTicketCard.title")}
      subtitle={{
        icon: <TicketWhiteIcon />,
        text: t("dailyTicketCard.subtitle"),
        color: theme.colors.brand.primary[900],
      }}
      icon={<TicketIllustration />}
    >
      <Button
        text={t("dailyTicketCard.buttonText")}
        textColor={theme.colors.brand.primary[600]}
        borderColor={theme.colors.brand.primary[50]}
        backgroundColor={theme.colors.brand.primary[50]}
        leftIcon={{
          name: "check",
          color: theme.colors.brand.primary[600],
          type: "outlined",
          size: 24,
        }}
        onPress={() => {}}
      />
    </CardTicket>
  );
}
