import { Impact, LegacyUserImpact } from "@ribon.io/shared";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";

type FormattedImpactText = ReturnType<
  typeof useFormattedImpactText
>["formattedImpactText"];

function formatUserImpact(
  userImpact: Impact[],
  status: string,
  formattedImpactText: FormattedImpactText,
) {
  return userImpact
    .filter((item) => item.nonProfit.status === status)
    .map((item) => ({
      id: item.nonProfit.id,
      title: item.nonProfit.impactTitle,
      subtitle: item.nonProfit.name,
      description: formattedImpactText(
        item?.nonProfit,
        Number(item?.impact),
        true,
        true,
      ),
      iconUrl: item.nonProfit.icon || item.nonProfit.coverImage,
      quantity: item.donationCount,
    }))
    .sort((a, b) => b.quantity - a.quantity );
}

function formatLegacyUserImpact(legacyUserImpact: LegacyUserImpact[]) {
  return legacyUserImpact.map((item) => ({
    id: item.legacyNonProfit.id,
    title: item.totalImpact,
    subtitle: item.legacyNonProfit.name,
    iconUrl: item.legacyNonProfit.logoUrl,
    quantity: item.donationsCount,
  }))
  .sort((a, b) => b.quantity - a.quantity );
}

export function formatImpactData(
  formattedImpactText: FormattedImpactText,
  status?: "active" | "inactive",
  userImpact?: Impact[],
  legacyUserImpact?: LegacyUserImpact[],
): {
  id: number;
  title: string;
  subtitle: string;
  description?: string | JSX.Element;
  iconUrl: string;
  quantity: number;
}[] {
  const data: ReturnType<typeof formatImpactData> = [];

  if (userImpact && status) {
    data.push(...formatUserImpact(userImpact, status, formattedImpactText));
  }

  if (legacyUserImpact) {
    data.push(...formatLegacyUserImpact(legacyUserImpact));
  }

  return data;
}
