import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { PressableStateCallbackType } from "react-native";
import * as S from "./styles";
import ConfigMenu from "../LayoutHeader/ConfigMenu";
import TicketSection from "../LayoutHeader/TicketSection";

type Props = {
  showsTicketsCounter?: boolean;
  hitSlop?: number;
};

function HeaderButtons({ showsTicketsCounter, hitSlop = 15 }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (menuVisible) logEvent("P18_view");
  }, [menuVisible]);

  const toggleModal = () => {
    setMenuVisible(!menuVisible);
  };

  return (
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
      <ConfigMenu toggleModal={toggleModal} menuVisible={menuVisible} />
    </S.ConfigContainer>
  );
}

export default HeaderButtons;
