import {
  apiGet,
  apiDelete,
  apiPut,
  apiPost,
  api,
  initializeApi as initializeSharedApi,
} from "@ribon.io/shared/services";
import { EXPO_PUBLIC_RIBON_API } from "utils/constants/Application";

const RIBON_API = "https://dapp-api.ribon.io/";
export const baseURL = EXPO_PUBLIC_RIBON_API || RIBON_API;

type initializeApiProps = {
  email?: string;
  language: "pt-BR" | "en";
  platform: "app";
};
export function initializeApi({
  language,
  email,
  platform,
}: initializeApiProps) {
  // TODO update this to use the useLanguage hook / localstorage when it's available

  const authHeaders = { Language: language, Email: email, Platform: platform };

  initializeSharedApi({ url: baseURL, headers: authHeaders });
}

export { apiGet, apiDelete, apiPut, apiPost };
export default api;
