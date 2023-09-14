import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
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
  causeId?: number;
  customStyle?: any;
};
function ContributionCard({
  from,
  isCause = false,
  causeId,
  customStyle,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });

  const { currentLang } = useLanguage();
  const { contribution, offer, description, nonProfit } = useImpactConversion();

  const { navigateTo } = useNavigation();

  const currentCurrency = currentLang === "pt-BR" ? "brl" : "usd";

  useEffect(() => {
    logEvent(isCause ? "contributeCauseBth_view" : "contributeNgoBth_view", {
      from,
    });
  }, []);

  const navigateToCheckout = () => {
    navigateTo("CheckoutScreen", {
      target: isCause ? "cause" : "non_profit",
      targetId: isCause ? causeId : nonProfit?.id,
      offer: offer ? offer.priceCents.toString() : "0",
      current: currentCurrency,
    });

    logEvent(isCause ? "giveCauseBtn_start" : "giveNgoBtn_start", {
      from,
    });
  };
  return (
    <View style={[S.container, customStyle]}>
      <Text style={S.title}>{t("titleCard")}</Text>

      <Text style={S.subtitle}>
        {t("donate", {
          value: formatPrice(
            contribution?.value ?? offer?.priceValue ?? 0,
            offer?.currency ?? currentCurrency,
          ),
        })}
      </Text>

      <Text style={S.text}>
        {description} {contribution?.impact && <b>{contribution.impact}</b>}
      </Text>

      <Button
        onPress={navigateToCheckout}
        text={t("button")}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor={theme.colors.brand.primary[600]}
        textColor={theme.colors.neutral10}
      />
    </View>
  );
}

export default ContributionCard;
