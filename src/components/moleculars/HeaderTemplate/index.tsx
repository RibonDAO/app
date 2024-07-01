import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { PressableStateCallbackType } from "react-native";
import * as S from "./styles";
import ConfigMenu from "../LayoutHeader/ConfigMenu";
import TicketSection from "../LayoutHeader/TicketSection";

type Props = {
  showsTicketsCounter?: boolean;
  children?: JSX.Element | JSX.Element[];
  background?: any;
  hitSlop?: number;
};
function HeaderTemplate({
  showsTicketsCounter = false,
  children,
  background,
  hitSlop = 15,
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
      <S.Background source={background} />
      <S.ConfigContainer
        accessibilityRole="button"
        onPress={toggleModal}
        hitSlop={hitSlop}
        style={({ pressed }: PressableStateCallbackType) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
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
