import httpService from "./httpService";

export const publicGetService = () => {
  return httpService("/req/getPublicInfo", "get");
};
