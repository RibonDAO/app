import Constants from "expo-constants";

export const RIBON_INTEGRATION_ID =
  Constants.expoConfig?.extra?.REACT_APP_RIBON_INTEGRATION_ID || 3;

export const REACT_APP_RIBON_API = Constants.expoConfig?.extra?.REACT_APP_RIBON_API;

export const PLATFORM = "app";
