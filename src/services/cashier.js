import { httpService } from "./httpService";
export const cashierService = (values, mode, geteway = "") => {
  return httpService("/req/" + mode + geteway, "post", {
    ...values,
  });
};
export const rateService = () => {
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  var tokenInfo = JSON.parse(localStorage.getItem(loginKey + "Token"));
  if (tokenInfo?.accessToken) return httpService("/req/getPrice", "get");
};
