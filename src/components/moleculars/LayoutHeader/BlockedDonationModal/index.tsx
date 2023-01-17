
import CenteredModal from "components/moleculars/modals/CenteredModal";
import TicketOff from "components/vectors/TicketOff";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function BlockedDonationModal({ visible, setVisible }: Props): JSX.Element {
  function renderModal() {
    return (
      <CenteredModal
        title="Você não tem mais vales :("
        icon={<TicketOff />}
        description="Gostaria de receber mais?"
        buttonText="Vamos lá!"
        visible={visible}
        setVisible={setVisible}
      />
    );
  }

  return renderModal();
}

export default BlockedDonationModal;
