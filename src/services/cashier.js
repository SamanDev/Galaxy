import httpService from "./httpService";
export const cashierService = (values, mode, geteway = "") => {
  return httpService("/req/" + mode + geteway, "post", {
    ...values,
  });
};
