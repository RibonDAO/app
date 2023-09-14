import Constants from "expo-constants";

export const RIBON_INTEGRATION_ID =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_INTEGRATION_ID || 1;

export const REACT_APP_RIBON_API =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_API;

export const REACT_APP_MIXPANEL_TOKEN =
  Constants.expoConfig?.extra?.REACT_APP_MIXPANEL_TOKEN;

export const REACT_APP_CIO_SITE_ID =
  Constants.expoConfig?.extra?.REACT_APP_CIO_SITE_ID;

export const REACT_APP_CIO_API_KEY =
  Constants.expoConfig?.extra?.REACT_APP_CIO_API_KEY;

export const PLATFORM = "app";

export const STRIPE_GLOBAL_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.REACT_APP_STRIPE_GLOBAL_PUBLISHABLE_KEY;
export const STRIPE_PUBLISHABLE_KEY =
  Constants.expoConfig?.extra?.REACT_APP_STRIPE_PUBLISHABLE_KEY;
