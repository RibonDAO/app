import { userAuthenticationApi } from "@ribon.io/shared/services";
import { authenticationApi } from "@ribon.io/shared/services";

import camelCaseKeys from "camelcase-keys";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "lib/localStorage/constants";
import { EXPO_PUBLIC_RIBON_API } from "utils/constants/Application";

export const baseURL = EXPO_PUBLIC_RIBON_API;
export const API_SCOPE = "/users/v1";

export type InitializeApiProps = {
  email: string;
  language: "pt-BR" | "en";
  platform: "app";
};

async function requestNewToken() {
  try {
    const refreshToken = await getLocalStorageItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    const res = await userAuthenticationApi.postRefreshToken(refreshToken);
    const newToken = res.headers["access-token"];
    const newRefreshToken = res.headers["refresh-token"];

    setLocalStorageItem(ACCESS_TOKEN_KEY, newToken);
    setLocalStorageItem(REFRESH_TOKEN_KEY, newRefreshToken);

    return newToken;
  } catch (err) {
    return null;
  }
}

export function initializeApi({
  language,
  email,
  platform,
}: InitializeApiProps) {
  // TODO update this to use the useLanguage hook / localstorage when it's available

  authenticationApi.interceptors.request.use(async (config) => {
    const accessToken = await getLocalStorageItem(ACCESS_TOKEN_KEY);

    // eslint-disable-next-line
    config.baseURL = baseURL;
    const authHeaders = {
      Authorization: `Bearer ${accessToken}`,
      Email: email,
      Language: language,
      Platform: platform,
    };
    // eslint-disable-next-line
    config.headers = { ...authHeaders, ...config.headers };

    return config;
  });
  authenticationApi.interceptors.response.use(
    (response) => ({
      ...response,
      data: camelCaseKeys(response.data, { deep: true }),
    }),
    async (error) => {
      const originalRequest = error.config;
      // eslint-disable-next-line no-underscore-dangle
      if (error?.response?.status === 403 && !originalRequest._retry) {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._retry = true;
        const newToken = await requestNewToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        const parsedOriginalRequest = {
          ...originalRequest,
          data: JSON.parse(originalRequest.data),
        };
        return authenticationApi.request(parsedOriginalRequest);
      }
      return Promise.reject(error);
    },
  );
}
