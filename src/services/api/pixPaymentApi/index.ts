import axios, { AxiosResponse } from "axios";
import { PixPayment } from "@ribon.io/shared/types";
import { EXPO_PUBLIC_CIO_API_KEY } from "utils/constants/Application";
import { apiPost } from "..";

const headers = {
  Authorization: `Bearer ${EXPO_PUBLIC_CIO_API_KEY}`,
  "Content-Type": "application/x-www-form-urlencoded",
};

const pixPaymentApi = {
  postPixPayment: (
    paymentInformation: PixPayment,
  ): Promise<AxiosResponse<any>> => apiPost("payments/pix", paymentInformation),
  generatePixPayment: (clientSecret: string): Promise<AxiosResponse<any>> =>
    axios.post(
      `https://api.stripe.com/v1/payment_intents/${clientSecret}/confirm`,
      {},
      { headers },
    ),
  verifyPixPayment: (clientSecret: string): Promise<AxiosResponse<any>> =>
    axios.post(
      `https://api.stripe.com/v1/payment_intents/${clientSecret}`,
      {},
      { headers },
    ),
};

export default pixPaymentApi;
