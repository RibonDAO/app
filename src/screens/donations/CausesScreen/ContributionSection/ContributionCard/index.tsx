import { Cause, Currencies, theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "contexts/languageContext";
import { useImpactConversion } from "hooks/useImpactConversion";
import { useNavigation } from "hooks/useNavigation";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { logEvent } from "services/analytics";

import S from "./styles";

type Props = {
  from: string;
  isCause?: boolean;
  cause?: Cause;
  customStyle?: any;
  impact?: string;
  description?: any;
};
function ContributionCard({
  from,
  isCause = false,
  cause,
  customStyle,
  impact,
  description,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });

  const { currentLang } = useLanguage();
  const {
    contribution,
    offer,
    description: descriptionImpact,
    nonProfit,
  } = useImpactConversion();
  const { currentUser } = useCurrentUser();

  const { navigateTo } = useNavigation();

  const currentCurrency =
    currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD;

  useEffect(() => {
    logEvent(isCause ? "contributeCauseBtn_view" : "contributeNgoBtn_view", {
      from,
    });
  }, []);

  const target = isCause ? "cause" : "non_profit";
  const targetId = isCause ? cause?.id : nonProfit?.id;

  const navigateToCheckout = () => {
    logEvent(isCause ? "giveCauseBtn_start" : "giveNgoBtn_start", {
      from,
    });

    navigateTo("RecurrenceScreen", {
      targetId,
      target,
      offer: offer ? offer.priceCents : 0,
      currency: currentCurrency,
      subscription: false,
    });
  };

  const descriptionContribution = isCause ? description : descriptionImpact;

  const impactContribution = isCause ? impact : contribution?.impact;
  return currentUser && contribution ? (
    <View style={[S.container, customStyle]}>
      <Text style={S.title}>
        {from === "donateTickets_page"
          ? t("titleCard")
          : t("titleCardWithName", {
              name: isCause ? cause?.name : nonProfit?.name,
            })}
      </Text>

      <Text style={S.subtitle}>
        {t("donate", {
          value: formatPrice(
            contribution?.value ?? offer?.priceValue ?? 0,
            offer?.currency ?? currentCurrency,
          ),
        })}
      </Text>

      <Text style={S.text}>
        {descriptionContribution}{" "}
        <Text style={{ fontWeight: "bold", fontFamily: "Inter700" }}>
          {impactContribution}
        </Text>
      </Text>

      <Button
        onPress={navigateToCheckout}
        text={t("button")}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor={theme.colors.brand.primary[600]}
        textColor={theme.colors.neutral10}
      />
    </View>
  ) : (
    <View />
  );
}

export default ContributionCard;
