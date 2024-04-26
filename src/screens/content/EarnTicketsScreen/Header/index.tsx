import { useTranslation } from "react-i18next";

import HeaderTemplate from "components/moleculars/HeaderTemplate";
import * as S from "./styles";
import { StrikeIcon } from "./assets/StrikeIcon";

function Header(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "newHeader",
  });

  return (
    <HeaderTemplate showsTicketsCounter>
      <S.Container>
        <StrikeIcon />
        <S.Counter>
          <S.CounterText>{7}</S.CounterText>

          <S.Description>{t("myTickets")}</S.Description>
        </S.Counter>
      </S.Container>
    </HeaderTemplate>
  );
}

export default Header;
