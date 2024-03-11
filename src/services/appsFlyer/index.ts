import appsFlyer from "react-native-appsflyer";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";
import { EXPO_PUBLIC_APPSFLYER_APP_ID } from "utils/constants/Application";

export async function initAppsFlyer() {
  appsFlyer.initSdk(
    {
      devKey: process.env.REACT_APP_APPSFLYER_KEY || "",
      isDebug: false,
      appId: EXPO_PUBLIC_APPSFLYER_APP_ID,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      timeToWaitForATTUserAuthorization: 10,
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
