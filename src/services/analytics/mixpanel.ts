import { Mixpanel } from 'mixpanel-react-native';
import { MIXPANEL_TOKEN } from 'utils/constants/Application';

let mixpanel: Mixpanel | undefined;

if (process.env.NODE_ENV === 'production') {
  const trackAutomaticEvents = true;
  console.log('MIXPANEL_TOKEN', process.env);
  mixpanel = new Mixpanel(MIXPANEL_TOKEN, trackAutomaticEvents);
  mixpanel.init();
}

export { mixpanel };


