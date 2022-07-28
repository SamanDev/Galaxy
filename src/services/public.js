import httpService from "./httpService";

export const publicGetService = (mode) => {
  return httpService("/pub/" + mode, "get");
};
