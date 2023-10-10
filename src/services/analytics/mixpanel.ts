import { Mixpanel } from "mixpanel-react-native";
import { EXPO_PUBLIC_MIXPANEL_TOKEN } from "utils/constants/Application";

// eslint-disable-next-line import/no-mutable-exports
let mixpanel: Mixpanel | undefined;
if (global.process.env.NODE_ENV === "production") {
  const trackAutomaticEvents = true;
  if (EXPO_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel = new Mixpanel(EXPO_PUBLIC_MIXPANEL_TOKEN, trackAutomaticEvents);
    mixpanel.init();
  }
}

export { mixpanel };
