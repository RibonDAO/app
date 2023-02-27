import { useNonProfitImpact } from "@ribon.io/shared/hooks";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { Currencies, NonProfit, PersonPayment } from "@ribon.io/shared/types";
import { formatDateTime } from "lib/formatters/dateFormatter";
import S from "screens/users/ProfileScreen/DirectDonationsImpactCards/styles";
import CardImageText from "components/moleculars/CardImageText";
import { formatPrice } from "lib/formatters/currencyFormatter";

type Props = {
  personPayment: PersonPayment;
};
function DirectDonationCard({ personPayment }: Props): JSX.Element {
  const { nonProfitImpact } = useNonProfitImpact(
    personPayment.receiver.id,
    personPayment.offer.priceValue,
    personPayment.offer.currency as Currencies,
  );
  const { formattedImpactText } = useFormattedImpactText();
  return (
    <CardImageText
      image={personPayment.receiver.logo}
      text={formattedImpactText(
        personPayment.receiver as NonProfit,
        undefined,
        true,
        true,
        nonProfitImpact,
      )}
      subtitle={personPayment.receiver.name}
      title={
        personPayment.offer
          ? formatPrice(
              personPayment.offer.priceValue,
              personPayment.offer.currency,
            )
          : `${personPayment.amountCents / 100} USDC`
      }
      footerText={formatDateTime(personPayment.paidDate)}
      subtitleStyle={S.subtitleStyle}
      titleStyle={S.titleStyle}
    />
  );
}

export default DirectDonationCard;
