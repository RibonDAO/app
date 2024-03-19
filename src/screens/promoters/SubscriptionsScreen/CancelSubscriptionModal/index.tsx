import { useSubscriptions } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { showToast } from "lib/Toast";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  club: boolean;
  subscriptionId: string | number;
};

function CancelSubscriptionModal({
  visible,
  setVisible,
  subscriptionId,
  club = false,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.subscriptionsScreen.cancelSubscriptionModal",
  });

  const { sendCancelSubscriptionEmail } = useSubscriptions();

  const handleCancelSubscription = async () => {
    if (!subscriptionId) {
      return;
    }

    logEvent("cancelSubs_click");
    try {
      const response = await sendCancelSubscriptionEmail(subscriptionId);
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
    title: club ? t("title") : t("contributionTitle"),
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

export default CancelSubscriptionModal;
