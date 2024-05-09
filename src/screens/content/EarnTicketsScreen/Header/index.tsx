import { useTranslation } from "react-i18next";

import HeaderTemplate from "components/moleculars/HeaderTemplate";
import * as S from "./styles";
import { StrikeIcon } from "./assets/StrikeIcon";
import Background from "./assets/background.png";

type Props = {
  userStreak: number;
};
function Header({ userStreak }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.header",
  });

  return (
    <HeaderTemplate showsTicketsCounter background={Background}>
      <S.Container>
        <StrikeIcon />
        <S.Counter>
          <S.CounterText>{userStreak}</S.CounterText>
          <S.Description>{t("donationStreak")}</S.Description>
        </S.Counter>
      </S.Container>
    </HeaderTemplate>
  );
}

export default Header;
