import * as Sentry from "sentry-expo";

export function logError(error: any) {
  Sentry.Native.captureException(error);
}
