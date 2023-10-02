import messaging from "@react-native-firebase/messaging";
import { CustomerIO } from "customerio-reactnative";

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
  const enabled = await CustomerIO.getPushPermissionStatus();
  if (enabled === "Granted") {
    return true;
  } else {
    return false;
  }
}

export async function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // eslint-disable-next-line no-console
    console.log("remoteMessage: ", remoteMessage);
  });
}

export async function getNotificationToken() {
  return messaging().getToken();
}
