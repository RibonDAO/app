import {
  CustomerIO,
  CustomerIOEnv,
  CustomerioConfig,
  Region,
} from "customerio-reactnative";
import {
  EXPO_PUBLIC_CIO_API_KEY,
  EXPO_PUBLIC_CIO_SITE_ID,
} from "utils/constants/Application";

function initializeCRM() {
  const env = new CustomerIOEnv();
  env.siteId = EXPO_PUBLIC_CIO_SITE_ID;
  env.apiKey = EXPO_PUBLIC_CIO_API_KEY;
  env.region = Region.US;

  const data = new CustomerioConfig();
  data.enableInApp = true;

  CustomerIO.initialize(env, data);
}

export function CRMidentifyUser(email: string) {
  CustomerIO.identify(email);
}

export function CRMupdateUserAttributes(
  email: string,
  attributes: Record<string, any>,
) {
  CRMidentifyUser(email);
  CustomerIO.setProfileAttributes(attributes);
}

export function CRMclearIdentify() {
  CustomerIO.clearIdentify();
}

export function CRMregisterDeviceToken(email: string, token: string) {
  CRMidentifyUser(email);
  CustomerIO.registerDeviceToken(token);
}

export function CRMclearDeviceToken() {
  CustomerIO.deleteDeviceToken();
}

type CRMAskForPushNotificationPermissionProps = {
  onGranted: () => void;
  onDenied: () => void;
  onNotDetermined?: () => void;
  onError: (error: Error) => void;
};

export async function CRMAskForPushNotificationPermission({
  onGranted,
  onDenied,
  onNotDetermined,
  onError,
}: CRMAskForPushNotificationPermissionProps) {
  const options = { ios: { sound: true, badge: true } };

  CustomerIO.showPromptForPushNotifications(options)
    .then((status) => {
      switch (status) {
        case "Granted":
          onGranted();
          break;
        case "Denied":
          onDenied();
          break;
        default:
          if (onNotDetermined) onNotDetermined();
      }
    })
    .catch((error) => {
      onError(error);
    });
}

export async function CRMGetNotificationStatus() {
  return CustomerIO.getPushPermissionStatus();
}

export async function CRMGetDeviceToken() {
  return CustomerIO.pushMessaging().getRegisteredDeviceToken();
}

export default initializeCRM;
