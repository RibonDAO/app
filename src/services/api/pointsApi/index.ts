import { AxiosResponse } from "axios";
import { apiGet } from "../index";

const pointsApi = {
  getPoints: (id: number | null): Promise<AxiosResponse<any[]>> =>
    apiGet(`users/${id}/points`),
};

export default pointsApi;
