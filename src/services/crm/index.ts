import { CustomerIO, CustomerIOEnv, Region } from "customerio-reactnative";

function initializeCRM() {
  const env = new CustomerIOEnv();
  env.siteId = "73ff8cc7faa5e7d7e975";
  env.apiKey = "cb51b8dd6005ba7065f6";
  env.region = Region.US;

  CustomerIO.initialize(env);
}

export function CRMidentifyUser(email: string) {
  CustomerIO.identify(email);
}

export function CRMclearIdentify() {
  CustomerIO.clearIdentify();
}

export default initializeCRM;
