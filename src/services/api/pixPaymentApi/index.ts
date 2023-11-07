import { AxiosResponse } from "axios";
import { PixPayment } from "@ribon.io/shared/types";

import { apiPost, apiGet } from "..";

const pixPaymentApi = {
  postPixPayment: (
    paymentInformation: PixPayment,
  ): Promise<AxiosResponse<any>> => apiPost("payments/pix", paymentInformation),
  generatePix: (id: string): Promise<AxiosResponse<any>> =>
    apiPost("payments/pix/generate", { id }),
  verifyPix: (id: string): Promise<AxiosResponse<any>> =>
    apiGet(`payments/pix/${id}`),
};

export default pixPaymentApi;
