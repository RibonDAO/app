import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { View, Text } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Button from "components/atomics/buttons/Button";
import { logEvent } from "services/analytics";
import S from "./styles";
import Illustration from "./assets/Illustration";

export default function ClubContributionDoneScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubContributionDoneScreen",
  });
  const { navigateTo } = useNavigation();

  const handleNavigate = () => {
    logEvent("afterPaymentBtn_click", { from: "club" });
    navigateTo("EarnTicketsScreen");
  };

  return (
    <View style={S.container}>
      <Illustration />

      <Text style={S.title}>{t("title")}</Text>

      <Text style={S.description}> {t("description")}</Text>

      <Text style={S.highlightedDescription}>
        {t("highlightedDescription")}
      </Text>
      <Button
        onPress={() => handleNavigate()}
        text={t("buttonText")}
        customTextStyles={{
          color: theme.colors.neutral10,
        }}
        customStyles={{
          backgroundColor: theme.colors.brand.primary[600],
          borderColor: theme.colors.brand.primary[800],
          position: "absolute",
          bottom: 0,
          display: "flex",
          height: theme.spacingNative(48),
          marginBottom: theme.spacingNative(16),
        }}
      />
    </View>
  );
}
