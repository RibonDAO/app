import { Mixpanel } from 'mixpanel-react-native';
import { REACT_APP_MIXPANEL_TOKEN } from 'utils/constants/Application';

let mixpanel: Mixpanel | undefined;
if (global.process.env.NODE_ENV === 'production') {
  const trackAutomaticEvents = true;
  mixpanel = new Mixpanel(REACT_APP_MIXPANEL_TOKEN, trackAutomaticEvents);
  mixpanel.init();
}

export { mixpanel };


