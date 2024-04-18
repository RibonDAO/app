import { useTranslation } from "react-i18next";
import { useIntegration } from "@ribon.io/shared/hooks";
import { useNavigation } from "hooks/useNavigation";
import { useIntegrationContext } from "contexts/integrationContext";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useEffect } from "react";
import { logEvent } from "services/analytics";
import RibonLogo from "./assets/logo-ribon";
import * as S from "./styles";
import Envelope from "./assets/envelope";

function FirstSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.v2.firstSection",
  });
  const { navigateTo } = useNavigation();
  const { currentIntegrationId } = useIntegrationContext();
  const { integration } = useIntegration(currentIntegrationId);

  const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;

  const title = isRibonIntegration
    ? t("title")
    : t("integrationTitle", {
        integrationName: integration?.name,
      });

  const handleHasAccount = () => {
    logEvent("openAuthBtn_click");
    navigateTo("SignInScreen");
  };

  useEffect(() => {
    logEvent("P10_view");
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.LogosWrapper>
          <S.logoContainer>
            <RibonLogo />
          </S.logoContainer>
          {!isRibonIntegration && (
            <>
              <S.ImageContainerText>+</S.ImageContainerText>
              <S.logoContainer>
                <S.Logo
                  source={{
                    uri: integration?.logo,
                  }}
                  alt="integration-logo"
                />
              </S.logoContainer>
            </>
          )}
        </S.LogosWrapper>
      </S.Header>
      <S.TextContainer>
        <Envelope />
        <S.Title>{title}</S.Title>
        <S.Description>{t("description")}</S.Description>
      </S.TextContainer>
      <S.ButtonContainer>
        <S.Footer>
          <S.MutedText>{t("haveAnAccount")}</S.MutedText>
          <S.Clickable onPress={handleHasAccount}>
            <S.ClickableText>{t("signIn")}</S.ClickableText>
          </S.Clickable>
        </S.Footer>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default FirstSection;
