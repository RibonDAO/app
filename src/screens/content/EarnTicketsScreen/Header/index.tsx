import { useTranslation } from "react-i18next";

import HeaderTemplate from "components/moleculars/HeaderTemplate";
import * as S from "./styles";
import { StrikeIcon } from "./assets/StrikeIcon";

type Props = {
  streak: number;
};
function Header({ streak }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "newHeader",
  });

  return (
    <HeaderTemplate showsTicketsCounter>
      <S.Container>
        <StrikeIcon />
        <S.Counter>
          <S.CounterText>{streak}</S.CounterText>

          <S.Description>{t("myTickets")}</S.Description>
        </S.Counter>
      </S.Container>
    </HeaderTemplate>
  );
}

export default Header;
