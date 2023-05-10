import analytics from "@react-native-firebase/analytics";
import { mixpanel } from "./mixpanel";

export async function logEvent(eventName: string, params?: Record<any, any>) {
  const paramsWithPlatform = {...params, platform: 'app'};
  await analytics().logEvent(eventName, paramsWithPlatform);
  if (mixpanel !== undefined) {
    mixpanel?.track(eventName, paramsWithPlatform);
  }
}
