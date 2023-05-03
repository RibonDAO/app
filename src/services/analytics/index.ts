import analytics from "@react-native-firebase/analytics";

export async function logEvent(eventName: string, params?: Record<any, any>) {
  const paramsWithPlatform = {params, platform: 'app'};
  await analytics().logEvent(eventName, paramsWithPlatform);
}
