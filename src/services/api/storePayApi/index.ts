import { AxiosResponse } from "axios";
import { apiPost } from "..";

const storePayApi = {
  postStorePay: (data: Record<string, any>): Promise<AxiosResponse<any>> =>
    apiPost("payments/store_pay", data),
};

export default storePayApi;
