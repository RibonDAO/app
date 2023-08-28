import { useSubscriptions } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { showToast } from "lib/Toast";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  contributionId: string | number;
};

function CancelContributionModal({
  visible,
  setVisible,
  contributionId,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsScreen.cancelContributionModal",
  });

  const { sendCancelSubscriptionEmail } = useSubscriptions();

  const handleCancelSubscription = async () => {
    if (!contributionId) {
      return;
    }

    logEvent("cancelSubs_click");
    try {
      const response = await sendCancelSubscriptionEmail(contributionId);
      if (response) {
        showToast({
          type: "success",
          message: t("sendEmail"),
          position: "bottom",
        });
      }
    } catch (error) {
      logError(error);
    } finally {
      setVisible(false);
    }
  };

  const deletionDialogProps = {
    title: t("title"),
    description: t("description"),
    icon: "delete_forever",
    type: "error",
    primaryButton: {
      text: t("cancelButton"),
      onPress: handleCancelSubscription,
    },
    secondaryButton: {
      text: t("closeButton"),
      onPress: () => setVisible(false),
    },
  };

  const modalProps = deletionDialogProps;

  return (
    <ModalDialog visible={visible} setVisible={setVisible} {...modalProps} />
  );
}

export default CancelContributionModal;
