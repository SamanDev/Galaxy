import { httpService } from "./httpService";

export const publicGetService = () => {
  return httpService("/req/getPublicInfo", "get");
};
export const publicGetRules = () => {
  return httpService("/req/getRewardsRules", "get");
};
