import * as Sentry from "sentry-expo";

export function logError(error: any) {
  console.log("error: ", error);
  Sentry.Native.captureException(error);
}
