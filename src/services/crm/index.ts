import {
  CustomerIO,
  CustomerIOEnv,
  CustomerioConfig,
  Region,
} from "customerio-reactnative";
import {
  EXPO_PUBLIC_CIO_API_KEY,
  EXPO_PUBLIC_CIO_SITE_ID,
} from "utils/constants/Application";

function initializeCRM() {
  const env = new CustomerIOEnv();
  env.siteId = EXPO_PUBLIC_CIO_SITE_ID;
  env.apiKey = EXPO_PUBLIC_CIO_API_KEY;
  env.region = Region.US;

  const data = new CustomerioConfig();
  data.enableInApp = true;

  CustomerIO.initialize(env, data);
}

export function CRMidentifyUser(email: string) {
  CustomerIO.identify(email);
}

export function CRMclearIdentify() {
  CustomerIO.clearIdentify();
}

export default initializeCRM;
