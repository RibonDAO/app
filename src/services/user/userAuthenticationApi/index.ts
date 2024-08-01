import { AxiosResponse } from "axios";
import { apiPost } from "../../authenticationApi";

const userAuthenticationApi = {
  postSendOtpEmail: (
    email?: string,
    accountId?: string,
  ): Promise<AxiosResponse<any>> =>
    apiPost("auth/send_otp_email", { email, accountId }),
  postAuthorizeFromOtpCode: (
    otpCode: string,
    id: string,
  ): Promise<AxiosResponse<any>> =>
    apiPost("auth/authorize_from_otp_code", { otpCode, id }),
};

export default userAuthenticationApi;
