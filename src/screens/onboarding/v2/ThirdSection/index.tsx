import { useTranslation } from "react-i18next";
import { useIsOnboarding } from "contexts/onboardingContext";
import CardInfo from "components/moleculars/CardInfo";
import { theme } from "@ribon.io/shared";
import { useEffect } from "react";
import { logEvent } from "services/analytics";
import * as S from "./styles";

function ThirdSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.v2.thirdSection",
  });
  const { setOnboardingCompleted } = useIsOnboarding();

  useEffect(() => {
    logEvent("P34_view", { from: "onboarding" });
    setOnboardingCompleted(true);
  }, []);

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <CardInfo
        icon={{
          name: "confirmation_number",
          type: "rounded",
          color: theme.colors.brand.secondary[800],
          size: 20,
        }}
        title={t("cardTitle1")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.secondary[100]}
        backgroundColor={theme.colors.brand.secondary[25]}
      >
        {t("cardDescription1")}
      </CardInfo>
      <CardInfo
        icon={{
          name: "volunteer_activism",
          type: "rounded",
          color: theme.colors.brand.quaternary[600],
          size: 20,
        }}
        title={t("cardTitle2")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.quaternary[100]}
        backgroundColor={theme.colors.brand.quaternary[25]}
      >
        {t("cardDescription2")}
      </CardInfo>
      <CardInfo
        icon={{
          name: "psychiatry",
          type: "sharp",
          color: theme.colors.brand.primary[800],
          size: 20,
        }}
        title={t("cardTitle3")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.primary[100]}
        backgroundColor={theme.colors.brand.primary[25]}
      >
        {t("cardDescription3")}
      </CardInfo>
    </S.Container>
  );
}

export default ThirdSection;
