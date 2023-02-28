import CenteredModal from "components/moleculars/modals/CenteredModal";
import Ticket from "components/vectors/Ticket";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function TicketModal({ visible, setVisible }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader.ticketModal",
  });

  function renderModal() {
    return (
      <CenteredModal
        title={t("title")}
        icon={<Ticket />}
        buttonText={t("buttonText")}
        description={t("description")}
        visible={visible}
        setVisible={setVisible}
        primaryButtonClick={() => setVisible(false)}
      />
    );
  }

  return renderModal();
}

export default TicketModal;
