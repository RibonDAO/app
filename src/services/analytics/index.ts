import analytics from "@react-native-firebase/analytics";

export async function logEvent(eventName: string, params?: Record<any, any>) {
  const newParams = {...params, ...{platform: 'app'}}
  await analytics().logEvent(eventName, newParams);
}
