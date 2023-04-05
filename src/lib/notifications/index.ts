import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermissionForNotifications() {
  const permissionStatus = await messaging().requestPermission();
  const enabled =
    permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken();
    console.log('token:', token);
    console.log('Authorization status:', permissionStatus);
  }
}

export async function setBackgroundMessageHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}