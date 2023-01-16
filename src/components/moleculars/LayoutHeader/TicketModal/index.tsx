
import CenteredModal from "components/moleculars/modals/CenteredModal";
import DangerIcon from "components/vectors/DangerIcon";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function TicketModal({ visible, setVisible }: Props): JSX.Element {
  function renderModal() {
    return (
      <CenteredModal
        title="Doar juntos para mudar vidas!"
        icon={<DangerIcon />}
        description="Você tem um ticket para receber"
        visible={visible}
        setVisible={setVisible}
      />
    );
  }

  return renderModal();
}

export default TicketModal;
