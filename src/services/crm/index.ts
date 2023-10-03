import {
  CustomerIO,
  CustomerIOEnv,
  CustomerioConfig,
  Region,
} from "customerio-reactnative";

function initializeCRM() {
  const env = new CustomerIOEnv();
  env.siteId = "73ff8cc7faa5e7d7e975";
  env.apiKey = "cb51b8dd6005ba7065f6";
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
