import Constants from "expo-constants";

export const RIBON_INTEGRATION_ID =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_INTEGRATION_ID || 1;

export const REACT_APP_RIBON_API =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_API;

export const REACT_APP_MIXPANEL_TOKEN =
  Constants.expoConfig?.extra?.REACT_APP_MIXPANEL_TOKEN;

export const PLATFORM = "app";

export const STRIPE_GLOBAL_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.REACT_APP_STRIPE_GLOBAL_PUBLISHABLE_KEY;
export const STRIPE_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.REACT_APP_STRIPE_PUBLISHABLE_KEY;

export const REACT_APP_ZENDESK_KEY =
  Constants.expoConfig?.extra?.REACT_APP_ZENDESK_KEY;

export const RIBON_GROWTHBOOK_URL =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_GROWTHBOOK_URL ||
  "https://growthbook.ribon.io:444/api/features/staging_Crjm8K6L2Rzpl96doCeg0kBiurgT5T67YP84V8bIQ";
