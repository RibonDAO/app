import { Mixpanel } from 'mixpanel-react-native';
import Constants from 'expo-constants';

let mixpanel: Mixpanel | undefined;

if (process.env.NODE_ENV === 'production') {
  const trackAutomaticEvents = true;
  console.log('MIXPANEL_TOKEN', process.env);
  mixpanel = new Mixpanel(Constants?.expoConfigs?.extra?.MIXPANEL_TOKEN, trackAutomaticEvents);
  mixpanel.init();
}

export { mixpanel };


