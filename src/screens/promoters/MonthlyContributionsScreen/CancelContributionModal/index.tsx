import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  contributionId: string;
};

function CancelContributionModal({
  visible,
  setVisible,
  contributionId,
}: Props): JSX.Element {
  const dispose = () => {
    setVisible(false);
  };

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsScreen.cancelContributionModal",
  });

  const deletionDialogProps = {
    title: t("title"),
    description: t("description"),
    icon: "delete_forever",
    type: "error",
    primaryButton: {
      text: t("cancelButton"),
      onPress: dispose,
    },
    secondaryButton: {
      text: t("closeButton"),
      onPress: dispose,
    },
  };

  const modalProps = deletionDialogProps;

  return (
    <ModalDialog visible={visible} setVisible={setVisible} {...modalProps} />
  );
}

export default CancelContributionModal;
