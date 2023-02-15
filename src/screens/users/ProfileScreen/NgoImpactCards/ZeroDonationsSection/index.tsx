import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import ImpactDonationsVector from "./ImpactDonationsVector";
import S from "./styles.ts";

function ZeroDonationsSection(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen.ngoImpactCards.zeroDonationsSection",
  });

  function navigateToPromotersScreen() {
    navigateTo("PromotersScreen");
  }

  return (
    <View style={S.zeroDonationsSection}>
      <ImpactDonationsVector />
      <Text style={S.zeroDonationsTitle}>{t("title")}</Text>
      <Text style={S.zeroDonationsDescription}>{t("description")}</Text>
      <Button
        text={t("buttonText")}
        onPress={() => navigateToPromotersScreen()}
        textColor={theme.colors.green40}
        customStyles={{ width: 200 }}
      />
    </View>
  );
}

export default ZeroDonationsSection;
