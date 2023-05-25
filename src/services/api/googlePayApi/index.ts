import { apiPost } from "..";

const googlePayApi = {
  postGooglePay: (data: Record<string, any>) =>
    apiPost("/payments/google_pay", data),
};

export default googlePayApi;
