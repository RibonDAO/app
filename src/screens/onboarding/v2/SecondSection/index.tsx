import { useTranslation } from "react-i18next";
import RibonLogo from "../FirstSection/assets/logo-ribon";
import Ticket from "./assets/ticket";
import * as S from "./styles";

function SecondSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.v2.secondSection",
  });

  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <RibonLogo />
        </S.LogoContainer>
      </S.Header>
      <S.TextContainer>
        <Ticket />
        <S.Title>{t("title")}</S.Title>
        <S.Description>{t("description")}</S.Description>
      </S.TextContainer>
    </S.Container>
  );
}

export default SecondSection;
