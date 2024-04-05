import { useTranslation } from "react-i18next";

import CardInfo from "components/moleculars/CardInfo";
import { theme } from "@ribon.io/shared";
import { useRouteParams } from "hooks/useRouteParams";
import Button from "components/atomics/buttons/Button";
import { TouchableOpacity } from "react-native";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useEffect } from "react";
import { logEvent } from "services/analytics";
import { useNavigation } from "hooks/useNavigation";
import * as S from "./styles";

function AboutTicketsScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.aboutTicketsScreen",
  });

  const { params } = useRouteParams<"AboutTicketsScreen">();

  const { from, title, buttonText, buttonOnPress } = params;

  const { popNavigation } = useNavigation();

  useEffect(() => {
    logEvent("P34_view", { from });
  }, []);

  return (
    <S.Container>
      <S.Arrow>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => popNavigation()}
          testID="arrow-back-button"
        >
          <ArrowLeft color={theme.colors.brand.primary[800]} />
        </TouchableOpacity>
      </S.Arrow>
      <S.Title>{title}</S.Title>
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

      <S.ButtonContainer>
        <Button
          text={buttonText}
          onPress={buttonOnPress}
          borderColor={theme.colors.brand.primary[800]}
          backgroundColor={theme.colors.brand.primary[800]}
          textColor={theme.colors.neutral10}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default AboutTicketsScreen;
