import { useNavigation } from "hooks/useNavigation";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function ZeroTicketsModal({ visible, setVisible }: Props): JSX.Element {
  const { navigateTo } = useNavigation();
  const dispose = () => {
    setVisible(false);
  };

  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader.zeroTicketsModal",
  });

  const handleNavigation = () => {
    dispose();
    navigateTo("ClubScreen");
  };

  const ZeroTicketsDialogProps = {
    title: t("title"),
    description: t("description"),
    icon: "confirmation_number",
    type: "club",
    primaryButton: {
      text: t("confirm"),
      onPress: handleNavigation,
    },
  };

  const modalProps = ZeroTicketsDialogProps;

  return (
    <ModalDialog visible={visible} setVisible={setVisible} {...modalProps} />
  );
}

export default ZeroTicketsModal;
