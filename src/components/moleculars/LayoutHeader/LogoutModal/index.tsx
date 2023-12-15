import { useNavigation } from "hooks/useNavigation";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";
import { useAuthentication } from "contexts/authenticationContext";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function DeleteAccountModal({ visible, setVisible }: Props): JSX.Element {
  const { logoutCurrentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { logout } = useAuthentication();

  const dispose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    logoutCurrentUser();
    logout();
    dispose();
    navigateTo("SignInScreen");
  };

  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader.logoutModal",
  });

  const logoutDialogProps = {
    title: t("title"),
    description: t("description"),
    icon: "info",
    type: "info",
    primaryButton: {
      text: t("confirm"),
      onPress: handleLogout,
    },
    secondaryButton: {
      text: t("cancel"),
      onPress: dispose,
    },
  };

  const modalProps = logoutDialogProps;

  return (
    <ModalDialog visible={visible} setVisible={setVisible} {...modalProps} />
  );
}

export default DeleteAccountModal;
