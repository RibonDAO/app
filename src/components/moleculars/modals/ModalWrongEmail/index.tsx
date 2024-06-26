import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { openInWebViewer } from "lib/linkOpener";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { EXPO_PUBLIC_ZENDESK_KEY } from "utils/constants/Application";

export type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalWrongEmail({
  visible = false,
  setVisible,
  eventName = "P27_emailErrorModal_view",
  eventParams = { from: "validation_flow" },
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.modals.ModalWrongEmail",
  });
  const { currentUser } = useCurrentUser();

  const handleSecondaryButton = () => {
    logEvent("supportBtn_click", eventParams);
    const key = EXPO_PUBLIC_ZENDESK_KEY;

    openInWebViewer(t("userSupportLink", { key }));
  };

  useEffect(() => {
    if (visible === true) {
      logEvent(eventName, eventParams);
    }
  }, [visible]);

  return (
    <ModalDialog
      visible={visible}
      setVisible={setVisible}
      title={t("title")}
      description={t("description", {
        email: currentUser?.email,
      })}
      primaryButton={{
        text: t("tryAgain"),
        onPress: () => {
          setVisible(false);
        },
      }}
      secondaryButton={{
        text: t("contactSupport"),
        onPress: () => {
          handleSecondaryButton();
        },
      }}
    />
  );
}

export default ModalWrongEmail;
