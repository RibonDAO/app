import analytics from "@react-native-firebase/analytics";
import { logError } from "services/crashReport";
import { logDebugEvent } from "config/DebugEventsView";
import { mixpanel } from "./mixpanel";
import { appsFlyer } from "./appsflyer";

export async function logEvent(eventName: string, params?: Record<any, any>) {
  const paramsWithPlatform = { ...params, platform: "app" };
  await analytics().logEvent(eventName, paramsWithPlatform);
  if (mixpanel !== undefined) {
    mixpanel?.track(eventName, paramsWithPlatform);
  }
  if (process.env.DEBUG_VIEW_ENABLED) {
    logDebugEvent(eventName, paramsWithPlatform);
  }

  if (appsFlyer !== undefined) {
    appsFlyer.logEvent(eventName, paramsWithPlatform);
  }
}

export async function setUserProperty(
  propertyName: string,
  propertyValue: string,
) {
  try {
    await analytics().setUserProperty(propertyName, propertyValue);
  } catch (error) {
    logError(error);
  }
}
