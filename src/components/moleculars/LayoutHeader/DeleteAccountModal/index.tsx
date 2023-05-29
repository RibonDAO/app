import { useUsers } from "@ribon.io/shared";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DevSettings } from "react-native";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function DeleteAccountModal({ visible, setVisible }: Props): JSX.Element {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logoutCurrentUser } = useCurrentUser();
  const { sendDeleteAccountEmail } = useUsers();

  const restartApp = () => {
    DevSettings.reload();
  };

  const dispose = () => {
    setVisible(false);
  };

  const disposeAndLogout = () => {
    dispose();
    restartApp();
  };

  const sendEmail = () => {
    setLoading(true);
    sendDeleteAccountEmail().then(() => {
      setEmailSent(true);
      setLoading(false);
      logoutCurrentUser();
    });
  };

  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader.deleteAccountModal",
  });

  const deletionDialogProps = {
    title: t("title"),
    description: t("description"),
    icon: "delete_forever",
    type: "error",
    primaryButton: {
      text: t("confirm"),
      onPress: sendEmail,
      disabled: loading,
    },
    secondaryButton: {
      text: t("cancel"),
      onPress: dispose,
    },
  };

  const emailSentProps = {
    title: t("emailSentTitle"),
    description: t("emailSentDescription"),
    icon: "check",
    type: "success",
    primaryButton: null,
    secondaryButton: {
      text: t("close"),
      onPress: disposeAndLogout,
    },
  };
  const modalProps = emailSent ? emailSentProps : deletionDialogProps;

  return (
    <ModalDialog visible={visible} setVisible={setVisible} {...modalProps} />
  );
}

export default DeleteAccountModal;
