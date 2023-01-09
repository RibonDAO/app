import { api } from "@ribon.io/shared/services";

const RIBON_API = "https://dapp-dev-api.ribon.io/";

export const baseURL = process.env.REACT_APP_RIBON_API || RIBON_API;

export async function initializeApi() {
  api.defaults.baseURL = baseURL;
  api.interceptors.request.use((config) => {
    const authHeaders = { Language: "en" };
    // eslint-disable-next-line no-param-reassign
    config.headers = { ...authHeaders, ...config.headers };

    return config;
  });
}

export default api;
