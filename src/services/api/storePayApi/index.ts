import { apiPost } from "..";

const storePayApi = {
  postStorePay: (data: Record<string, any>) =>
    apiPost("/payments/store_pay", data),
};

export default storePayApi;
