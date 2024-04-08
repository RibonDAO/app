import appsFlyer from "react-native-appsflyer";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";
import { EXPO_PUBLIC_APPSFLYER_KEY } from "utils/constants/Application";

export async function initAppsFlyer() {
  appsFlyer.initSdk(
    {
      devKey: EXPO_PUBLIC_APPSFLYER_KEY,
      isDebug: false,
      onInstallConversionDataListener: false,
      onDeepLinkListener: false,
      timeToWaitForATTUserAuthorization: 10,
      manualStart: true,
    },
    (result) => {
      logEvent("appsFlyerInit", {
        result: JSON.stringify(result),
      });
    },
    (error) => {
      logError(error);
    },
  );
}
