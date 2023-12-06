import {
  authenticationApiGet as apiGet,
  authenticationApiDelete as apiDelete,
  authenticationApiPut as apiPut,
  authenticationApiPost as apiPost,
  authenticationApi as api,
  initializeAuthenticationApi as initializeSharedApi,
  emptyRequest,
} from "@ribon.io/shared/services";
import { initializeHooks } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { EXPO_PUBLIC_RIBON_API } from "utils/constants/Application";
import { useAuthentication } from "contexts/authenticationContext";

const RIBON_API = "https://dapp-api.ribon.io/";
export const baseURL = EXPO_PUBLIC_RIBON_API || RIBON_API;
export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

export function initializeApi() {
  const lang = normalizedLanguage();
  const accessToken = useAuthentication();
  const authHeaders = {
    Language: lang,
    Authorization: `Bearer ${accessToken}}`,
  };

  initializeSharedApi({ url: baseURL, headers: authHeaders });

  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost, emptyRequest };
export default api;
