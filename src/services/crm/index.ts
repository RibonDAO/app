import {
  CustomerIO,
  CustomerIOEnv,
  CustomerioConfig,
  Region,
} from "customerio-reactnative";
import {
  REACT_APP_CIO_API_KEY,
  REACT_APP_CIO_SITE_ID,
} from "utils/constants/Application";

function initializeCRM() {
  const env = new CustomerIOEnv();
  env.siteId = REACT_APP_CIO_SITE_ID;
  env.apiKey = REACT_APP_CIO_API_KEY;
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
