import { AxiosResponse } from "axios";
import { apiGet } from "../index";

const badgesApi = {
  getBadges: (id: number | null): Promise<AxiosResponse<any[]>> =>
    apiGet(`users/${id}/badges`),
};

export default badgesApi;
