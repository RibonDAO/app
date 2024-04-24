import appsFlyer from "react-native-appsflyer";
import {
  EXPO_PUBLIC_APPSFLYER_KEY,
  EXPO_PUBLIC_APPSFLYER_APP_ID,
} from "utils/constants/Application";

// eslint-disable-next-line import/no-mutable-exports
let appsFlyerAnalytics: typeof appsFlyer;

if (global.process.env.NODE_ENV === "production") {
  appsFlyerAnalytics = appsFlyer;

  appsFlyer.initSdk({
    appId: EXPO_PUBLIC_APPSFLYER_APP_ID,
    devKey: EXPO_PUBLIC_APPSFLYER_KEY,
    isDebug: false,
    onInstallConversionDataListener: false,
    onDeepLinkListener: false,
    timeToWaitForATTUserAuthorization: 10,
    manualStart: true,
  });

  appsFlyer.startSdk();
}

export { appsFlyerAnalytics as appsFlyer };
