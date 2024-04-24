import { useSubscriptions } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { showToast } from "lib/Toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  subscriptionId: string | number;
  club?: boolean;
  eventParams?: any;
};

function CancelSubscriptionModal({
  visible,
  setVisible,
  subscriptionId,
  club = false,
  eventParams,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.subscriptionsScreen.cancelSubscriptionModal",
  });

  const { sendCancelSubscriptionEmail } = useSubscriptions();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  useEffect(() => {
    logEvent("cancelSubsModal_view", eventParams);
  }, []);

  const handleCancelSubscription = async () => {
    if (!subscriptionId) {
      return;
    }
    logEvent("cancelSubsBtn_click", eventParams);
    try {
      showLoadingOverlay();
      const response = await sendCancelSubscriptionEmail(subscriptionId);
      if (response) {
        showToast({
          type: "success",
          message: t("sendEmail"),
          position: "bottom",
        });
      }
    } catch (error) {
      hideLoadingOverlay();
      logError(error);
    } finally {
      hideLoadingOverlay();
      setVisible(false);
    }
  };

  const deletionDialogProps = {
    title: club ? t("title") : t("subscriptionTitle"),
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
