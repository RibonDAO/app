import CogIcon from "components/vectors/CogIcon";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { useNavigation } from "hooks/useNavigation";
import TicketSection from "./TicketSection";
import * as S from "./styles";

type Props = {
  hideTicket?: boolean;
  outline?: boolean;
};
function LayoutHeader({
  hideTicket = false,
  outline = false,
}: Props): JSX.Element {
  const { navigateTo } = useNavigation();

  const toggleModal = () => {
    navigateTo("ConfigScreen");
  };

  return (
    <S.ConfigContainer>
      {!hideTicket && (
        <TicketSection hasDividerBorder={!outline} outline={outline} />
      )}

      <S.Container accessibilityRole="button" onPress={toggleModal}>
        {outline ? (
          <Icon
            type="outlined"
            name="settings"
            size={24}
            color={theme.colors.neutral10}
          />
        ) : (
          <CogIcon />
        )}
      </S.Container>
    </S.ConfigContainer>
  );
}

export default LayoutHeader;
