import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import { useEffect, useState } from "react";
import { View } from "react-native";
import S from "./styles";

export const IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT =
  "IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT";
function ImpactMigrationNotification() {
  const [hideNotification, setHideNotification] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });

  const currentNotificationSeenCount = async () =>
    parseInt(
      (await getLocalStorageItem(IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT)) ||
        "0",
      10,
    );
  const handleHideNotificationClick = (setVisible: any) => {
    setVisible(false);
    setLocalStorageItem(IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT, "3");
  };

  const handleCloseClick = async () => {
    const notificationsSeenCount = (await currentNotificationSeenCount()) + 1;
    setLocalStorageItem(
      IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT,
      notificationsSeenCount.toString(),
    );
  };

  useEffect(() => {
    async function checkNotificationSeenCount() {
      const count = await currentNotificationSeenCount();
      setHideNotification(count >= 3);
    }

    checkNotificationSeenCount();
  }, []);

  if (hideNotification) return null;

  return (
    <View style={S.container}>
      <InlineNotification
        title={t("impactNotification.title")}
        description={t("impactNotification.description")}
        type="success"
        firstLink={t("impactNotification.link") || ""}
        onFirstLinkClick={handleHideNotificationClick}
        onCloseClick={handleCloseClick}
      />
    </View>
  );
}

export default ImpactMigrationNotification;
