import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import { useRouteParams } from "hooks/useRouteParams";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { useEffect } from "react";

export default function ContributionDoneScreen(): JSX.Element {
  const {
    params: { cause, nonProfit },
  } = useRouteParams<"ContributionDoneScreen">();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.contributionDoneScreen",
  });
  const { navigateTo } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigateTo("PromotersScreen");
    }, 5000);
  }, []);

  return (
    <DoneScreenTemplate
      image={nonProfit?.confirmationImageDescription || cause?.mainImage}
      imageDescription={
        nonProfit?.confirmationImageDescription || cause?.mainImageDescription
      }
      title={t("title") || ""}
      description={`${t("description")}`}
      highlightedDescription={nonProfit?.name || cause?.name}
    />
  );
}
