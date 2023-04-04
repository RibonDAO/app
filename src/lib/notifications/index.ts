import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermissionForNotifications() {
  const permissionStatus = await messaging().requestPermission();
  const enabled =
    permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', permissionStatus);
  }
}