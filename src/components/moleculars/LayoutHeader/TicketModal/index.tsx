import CenteredModal from "components/moleculars/modals/CenteredModal";
import Ticket from "components/vectors/Ticket";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function TicketModal({ visible, setVisible }: Props): JSX.Element {
  function renderModal() {
    return (
      <CenteredModal
        title="Legal! Você tem 1 vale para doar :)"
        icon={<Ticket />}
        buttonText="Vamos lá!"
        description="Você pode destiná-lo para qualquer projeto"
        visible={visible}
        setVisible={setVisible}
        primaryButtonClick={() => setVisible(false)}
      />
    );
  }

  return renderModal();
}

export default TicketModal;
