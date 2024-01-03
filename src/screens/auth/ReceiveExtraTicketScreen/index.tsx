import { useTranslation } from "react-i18next";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { useNavigation } from "hooks/useNavigation";
import { useIntegrationContext } from "contexts/integrationContext";
import BackgroundShapes from "components/vectors/BackgroundShapes";
import TicketRibon from "components/vectors/TicketRibon";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

function ReceiveExtraTicketScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.receiveExtraTicketScreen",
  });
  const { navigateTo } = useNavigation();
  const { setCurrentIntegrationId } = useIntegrationContext();

  const handleClick = () => {
    setCurrentIntegrationId(INTEGRATION_AUTH_ID);
    navigateTo("ReceiveTicketScreen");
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <S.ImageContainer>
          <S.ImageBackground>
            <BackgroundShapes />
          </S.ImageBackground>
          <TicketRibon />
        </S.ImageContainer>
        <S.TextContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{t("description")}</S.Description>
        </S.TextContainer>
        <S.Button
          onPress={handleClick}
          text={t("buttonText")}
          textColor={theme.colors.neutral10}
          borderColor={theme.colors.brand.primary[600]}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.ContentContainer>
    </S.Container>
  );
}

export default ReceiveExtraTicketScreen;
