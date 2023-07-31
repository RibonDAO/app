import { AxiosResponse } from "axios";
import { Device } from "../../../types/entities/Device";
import { apiPost } from "..";

const deviceApi = {
  registerDevice: (data: Device): Promise<AxiosResponse<any>> =>
    apiPost(`users/${data.userId}/devices`, data),
};

export default deviceApi;
