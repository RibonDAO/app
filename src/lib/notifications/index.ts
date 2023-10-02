import messaging from "@react-native-firebase/messaging";

export default async function requestUserPermissionForNotifications() {
  const permissionStatus = await messaging().requestPermission();
  const enabled =
    permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // eslint-disable-next-line no-console
    console.log("Authorization status:", permissionStatus);
  }

  return enabled;
}

export async function isNotificationsEnabled() {
  const enabled = await messaging().hasPermission();
  return enabled;
}

export async function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // eslint-disable-next-line no-console
    console.log("Message handled in the background!", remoteMessage);
  });
}

export async function getNotificationToken() {
  return messaging().getToken();
}
