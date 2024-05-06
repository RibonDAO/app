import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import * as S from "./styles";
import ConfigMenu from "../LayoutHeader/ConfigMenu";
import TicketSection from "../LayoutHeader/TicketSection";

type Props = {
  showsTicketsCounter?: boolean;
  children?: JSX.Element | JSX.Element[];
};
function HeaderTemplate({
  showsTicketsCounter = false,
  children,
}: Props): JSX.Element {
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
        {showsTicketsCounter && <TicketSection outline />}
        <Icon
          type="outlined"
          name="settings"
          size={24}
          color={theme.colors.neutral10}
        />
      </S.ConfigContainer>
      {children}
      <ConfigMenu toggleModal={toggleModal} menuVisible={menuVisible} />
    </S.Container>
  );
}

export default HeaderTemplate;
