import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { logEvent } from "services/analytics";

import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import RibonLogo from "./RibonLogo";
import * as S from "./styles";
import ConfigMenu from "../LayoutHeader/ConfigMenu";
import TicketSection from "./TicketSection";

function NewHeader(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "newHeader",
  });

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (menuVisible) logEvent("P18_view");
  }, [menuVisible]);

  const toggleModal = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <S.Container>
      <S.ConfigContainer accessibilityRole="button" onPress={toggleModal}>
        <Icon
          type="outlined"
          name="settings"
          size={24}
          color={theme.colors.neutral10}
        />
      </S.ConfigContainer>
      <S.InfoContainer>
        <RibonLogo />
        <S.TitleContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{t("description")}</S.Description>
        </S.TitleContainer>
      </S.InfoContainer>

      <TicketSection />
      <ConfigMenu toggleModal={toggleModal} menuVisible={menuVisible} />
    </S.Container>
  );
}

export default NewHeader;
