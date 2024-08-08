import Constants from "expo-constants";

export const RIBON_INTEGRATION_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_RIBON_INTEGRATION_ID || 1;

export const EXPO_PUBLIC_APPSFLYER_APP_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_APPSFLYER_APP_ID || "1337763424";

export const EXPO_PUBLIC_APPSFLYER_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_APPSFLYER_KEY;

export const EXPO_PUBLIC_RIBON_API =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_RIBON_API;

export const EXPO_PUBLIC_MIXPANEL_TOKEN =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_MIXPANEL_TOKEN;

export const PLATFORM = "app";

export const STRIPE_GLOBAL_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_STRIPE_GLOBAL_PUBLISHABLE_KEY;
export const STRIPE_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const EXPO_PUBLIC_ZENDESK_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_ZENDESK_KEY;

export const EXPO_PUBLIC_CIO_SITE_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CIO_SITE_ID;

export const EXPO_PUBLIC_CIO_API_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CIO_API_KEY;

export const GOOGLE_WEB_CLIENT_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export const INTEGRATION_AUTH_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_INTEGRATION_AUTH_ID ||
  "1a48c5ea-70ff-445d-91e6-5bd5cfacf7e5";
