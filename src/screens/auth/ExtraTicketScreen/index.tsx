import React from "react";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "services/analytics";
import { useNavigation } from "hooks/useNavigation";
import OneTicket from "components/vectors/OneTicket";
import usePageView from "hooks/usePageView";
import * as S from "./styles";

function ExtraTicketScreen(): JSX.Element {
  usePageView("P29_view", { from: "donation_flow" });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.extraTicketScreen",
  });
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();

  const handleButtonPress = () => {
    logEvent("authRewardSkipBtn_click", {
      from: "donation_flow",
    });
    navigateTo("Cause");
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <OneTicket />
        <S.TextContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>
            {t("description", { email: currentUser?.email })}
          </S.Description>
        </S.TextContainer>
        <S.Button
          text={t("buttonText")}
          onPress={handleButtonPress}
          backgroundColor={theme.colors.neutral10}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.brand.primary[600]}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default ExtraTicketScreen;
