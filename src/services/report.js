import httpService from "./httpService";

export const getReportService = (id = null, mode = "all") => {
  if (id) {
    return httpService(
      `/req/getReportsByUser/?id=${id}&mode=${mode}&page=1&number=100`,
      "get"
    );
  } else {
    return httpService(
      `/admin/getAllDepositCashout/?mode=${mode}&page=0`,
      "get"
    );
  }
};
export const adminGetServiceTest = (mode) => {
  return httpService("/req/" + mode, "get");
};
