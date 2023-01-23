import BottomModal from "components/moleculars/modals/BottomModal";
import { useNavigation } from "hooks/useNavigation";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function TicketModal({ visible, setVisible }: Props): JSX.Element {
  const { navigateTo } = useNavigation();

  function handleButtonClick() {
    setVisible(false);
    navigateTo("ChooseCauseScreen");
  }

  function renderModal() {
    return (
      <BottomModal
        visible={visible}
        setVisible={setVisible}
        title="Você tem um ticket disponível!"
        buttonText="Receber ticket"
        description="Use seus ticket para fazer doações :)"
        primaryButtonClick={handleButtonClick}
      />
    );
  }

  return renderModal();
}

export default TicketModal;
