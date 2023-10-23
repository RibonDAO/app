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
import { getCookiesItem } from "@ribon.io/shared/lib";
import { REACT_APP_RIBON_API } from "utils/constants/Application";

const RIBON_API = "https://dapp-api.ribon.io/";
export const baseURL = REACT_APP_RIBON_API || RIBON_API;
export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

export function initializeApi() {
  const lang = normalizedLanguage();
  const authHeaders = {
    Language: lang,
    Authorization: `Bearer ${getCookiesItem(ACCESS_TOKEN_KEY)}`,
  };

  initializeSharedApi({ url: baseURL, headers: authHeaders });

  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost, emptyRequest };
export default api;
