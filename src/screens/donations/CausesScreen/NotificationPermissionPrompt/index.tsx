import { useEffect, useState } from "react";
import { View } from "react-native";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import { showToast } from "lib/Toast";
import { logError } from "services/crashReport";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { usePaymentFailedNotification } from "contexts/paymentFailedNotificationContext";
import {
  CRMAskForPushNotificationPermission,
  CRMregisterDeviceToken,
} from "services/crm";
import { getNotificationToken } from "lib/notifications";
import { User } from "@ribon.io/shared/types";

const NOTIFICATION_CARD_VISIBLE_KEY = "NOTIFICATION_CARD_VISIBLE";

export type Props = {
  currentUser?: User;
};

export default function NotificationPermissionPrompt({ currentUser }: Props) {
  if (!currentUser) return null;

  const [visible, setVisible] = useState(false);
  const { visible: paymentFailedNotificationVisible } =
    usePaymentFailedNotification();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.enableNotification",
  });

  const setDeviceToken = async () => {
    const token = await getNotificationToken();
    CRMregisterDeviceToken(currentUser.email, token);
  };

  const handleHideNotificationClick = async () => {
    const hideAlert = () => {
      setLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY, "false");
      setVisible(false);
    };

    const handleGranted = () => {
      showToast({
        type: "success",
        message: t("successToastMessage"),
        position: "bottom",
      });
      hideAlert();
      setDeviceToken();
    };

    const handleDenied = () => {
      hideAlert();
    };

    const handleError = (e: Error) => {
      logError(e);
      showToast({
        type: "error",
        message: t("errorToastMessage"),
        position: "bottom",
      });
      hideAlert();
    };

    CRMAskForPushNotificationPermission({
      onGranted: handleGranted,
      onDenied: handleDenied,
      onError: handleError,
    });
  };

  useEffect(() => {
    const notificationCardVisible = async () => {
      const value = await getLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY);

      return (
        (value === "true" || value === null) &&
        paymentFailedNotificationVisible === false
      );
    };

    notificationCardVisible().then((isVisible) => {
      setVisible(isVisible);
    });
  }, [paymentFailedNotificationVisible]);

  return (
    visible && (
      <View style={{ paddingBottom: 16 }}>
        <InlineNotification
          title={t("title")}
          type="warning"
          customIcon="notifications"
          firstLink={t("link") || ""}
          onFirstLinkClick={handleHideNotificationClick}
        />
      </View>
    )
  );
}
