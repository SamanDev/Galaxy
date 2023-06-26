import { httpService } from "./httpService";

export const getReportService = (id = null, mode = "", gateway = "", usd) => {
  if (id) {
    return httpService(
      `/req/getReportsByUser/?id=${id}&mode=${mode}&gateway=${gateway}&usd=${usd}&page=1&number=100`,
      "get"
    );
  } else {
    return httpService(
      `/admin/getAllDepositCashout/?mode=${mode}&page=0`,
      "get"
    );
  }
};
export const getReportPenService = (mode) => {
  return httpService("/req/" + mode, "get");
};
