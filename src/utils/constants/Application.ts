import Constants from "expo-constants";

export const RIBON_INTEGRATION_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_RIBON_INTEGRATION_ID || 1;

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

export const WALLET_CONNECT_PROJECT_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const GOOGLE_WEB_CLIENT_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export const INTEGRATION_AUTH_ID =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_INTEGRATION_AUTH_ID || "17";
