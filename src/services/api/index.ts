import {
  apiGet,
  apiDelete,
  apiPut,
  apiPost,
  api,
  initializeApi as initializeSharedApi,
} from "@ribon.io/shared/services";
import { initializeHooks } from "@ribon.io/shared/hooks";

const RIBON_API = "https://dapp-dev-api.ribon.io/";

export const baseURL = process.env.REACT_APP_RIBON_API || RIBON_API;
export async function initializeApi() {
  // TODO update this to use the useLanguage hook / localstorage when it's available
  const lang = "pt-BR";
  const authHeaders = { Language: lang };
  initializeSharedApi({ url: baseURL, headers: authHeaders });
  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost };
export default api;
