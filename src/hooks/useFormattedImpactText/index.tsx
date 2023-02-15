import { impactNormalizer } from "@ribon.io/shared/lib";
import { useTranslation } from "react-i18next";
import { NonProfit, NonProfitImpact } from "@ribon.io/shared/types";

export function useFormattedImpactText() {
  const { t: normalizerTranslation } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  function formattedImpactText(
    nonProfit?: NonProfit,
    impact?: number,
    isRoundedImpact?: boolean,
    isHighlighted?: boolean,
    nonProfitImpact?: NonProfitImpact,
    prefix?: string,
  ): string {
    if (!nonProfit) return "";
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const roundedImpact =
      impact || nonProfitImpact?.roundedImpact || nonProfit?.impactByTicket;
    const prefixText = prefix ? `${prefix} ` : "";

    if (nonProfit && roundedImpact && impacts && nonProfitsImpactsLength) {
      const lastImpact = impacts[nonProfitsImpactsLength - 1];
      if (lastImpact.donorRecipient) {
        const normalizedImpact = impactNormalizer(
          nonProfit,
          roundedImpact,
          normalizerTranslation,
        );
        return `${prefixText}${normalizedImpact.join(" ")}`;
      }
    }

    return isRoundedImpact && nonProfitImpact
      ? `${nonProfitImpact?.roundedImpact} ${nonProfit?.impactDescription}`
      : `${prefixText} ${
          impact?.toString() || nonProfit?.impactByTicket.toString()
        } ${nonProfit?.impactDescription}`;
  }
  return { formattedImpactText };
}
export default useFormattedImpactText;
