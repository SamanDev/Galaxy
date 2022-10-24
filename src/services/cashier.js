import { httpService } from "./httpService";
export const cashierService = (values, mode, geteway = "") => {
  return httpService("/req/" + mode + geteway, "post", {
    ...values,
  });
};
export const rateService = () => {
  const tokenInfo = JSON.parse(localStorage.getItem("loginToken"));
  if (tokenInfo?.accessToken) return httpService("/req/getPrice", "get");
};
