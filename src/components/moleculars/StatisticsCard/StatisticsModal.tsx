import { useTranslation } from "react-i18next";
import ModalDialog from "../modals/ModalDialog";

type StatisticsModalProps = {
  visible: boolean;
  setVisible: (x: boolean) => void;
  type: "tickets" | "daysDonating";
};

function StatisticsModal({ visible, setVisible, type }: StatisticsModalProps) {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection",
  });

  const commonProps = {
    visible,
    setVisible,
    primaryButton: {
      text: "Fechar",
      onPress() {
        setVisible(false);
      },
    },
  };

  const modalProps = {
    tickets: {
      title: t("donatedTickets"),
      description: t("donatedTicketsDescription"),
    },
    daysDonating: {
      title: t("daysDoingGood"),
      description: t("daysDoingGoodDescription"),
    },
  };

  const props = modalProps[type];

  return <ModalDialog {...commonProps} {...props} />;
}

export default StatisticsModal;
