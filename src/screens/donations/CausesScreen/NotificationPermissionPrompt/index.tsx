import { useEffect, useState } from "react";
import { View } from "react-native";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import requestUserPermissionForNotifications from "lib/notifications";
import { showToast } from "lib/Toast";
import { logError } from "services/crashReport";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { usePaymentFailedNotification } from "contexts/paymentFailedNotificationContext";

const NOTIFICATION_CARD_VISIBLE_KEY = "NOTIFICATION_CARD_VISIBLE";

export default function NotificationPermissionPrompt() {
  const [visible, setVisible] = useState(false);
  const { visible: paymentFailedNotificationVisible } =
    usePaymentFailedNotification();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.enableNotification",
  });

  const handleHideNotificationClick = async () => {
    const hideAlert = () => {
      setLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY, "false");
      setVisible(false);
    };

    try {
      const enabled = await requestUserPermissionForNotifications();
      if (enabled) {
        showToast({
          type: "success",
          message: t("successToastMessage"),
          position: "bottom",
        });
        hideAlert();
      }
    } catch (e) {
      logError(e);
      showToast({
        type: "error",
        message: t("errorToastMessage"),
        position: "bottom",
      });
      hideAlert();
    }
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
