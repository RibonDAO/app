import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { PressableStateCallbackType } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import * as S from "./styles";
import TicketSection from "../LayoutHeader/TicketSection";

type Props = {
  showsTicketsCounter?: boolean;
  hitSlop?: number;
};

function HeaderButtons({ showsTicketsCounter, hitSlop = 15 }: Props) {
  const { navigateTo } = useNavigation();

  const toggleModal = () => {
    navigateTo("ConfigScreen");
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
    </S.ConfigContainer>
  );
}

export default HeaderButtons;
