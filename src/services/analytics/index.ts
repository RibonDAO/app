import analytics from '@react-native-firebase/analytics';

export async function logEvent(eventName: string, params?: Record<any, any>) {
  await analytics().logEvent(eventName, params);
  console.log("Evento logado com sucesso");
}
