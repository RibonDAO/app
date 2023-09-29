import { getLocalStorageItem, setLocalStorageItem } from "@ribon.io/shared";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import { useTasksContext } from "contexts/tasksContext";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import requestUserPermissionForNotifications from "lib/notifications";
import { showToast } from "lib/Toast";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { logError } from "services/crashReport";

import S from "./styles";

export default function CountdownSection() {
  const NOTIFICATION_CARD_VISIBLE_KEY = "NOTIFICATION_CARD_VISIBLE";
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });

  const { tasksState, reload } = useTasksContext();
  const countdown = useCountdown(nextDay(), reload);
  const [isNotificationCardVisible, setNotificationCardVisible] =
    useState(false);

  if (
    !tasksState ||
    !tasksState.length ||
    tasksState.filter((obj) => obj.done === false).length ||
    countdown.reduce((a, b) => a + b, 0) <= 0
  ) {
    return null;
  }

  const handleHideNotificationClick = async () => {
    const hideAlert = () => {
      setLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY, "false");
      setNotificationCardVisible(false);
    };

    try {
      const enabled = await requestUserPermissionForNotifications();
      if (enabled) {
        showToast({
          type: "success",
          message: t("enableNotification.successToastMessage"),
          position: "bottom",
        });
        hideAlert();
      }
    } catch (e) {
      logError(e);
      showToast({
        type: "error",
        message: t("enableNotification.errorToastMessage"),
        position: "bottom",
      });
      hideAlert();
    }
  };

  useEffect(() => {
    const notificationCardVisible = async () => {
      const value = await getLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY);
      return value === "true" || value === null;
    };

    notificationCardVisible().then((visible) => {
      setNotificationCardVisible(visible);
    });
  }, []);

  return (
    <View>
      <View style={S.timerWrapper}>
        <Text style={S.countdown}>{formatCountdown(countdown)}</Text>
        <Text>{t("countdown")}</Text>
      </View>

      {isNotificationCardVisible && (
        <View style={{ paddingBottom: 16 }}>
          <InlineNotification
            title={t("enableNotification.title")}
            type="warning"
            customIcon="notifications"
            firstLink={t("enableNotification.link") || ""}
            onFirstLinkClick={handleHideNotificationClick}
          />
        </View>
      )}
    </View>
  );
}
