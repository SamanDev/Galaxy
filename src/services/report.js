import httpService from "./httpService";

export const getReportService = (id = null, mode = "all", gateway = "all") => {
  if (id) {
    return httpService(
      `/req/getReportsByUser/?id=${id}&mode=${mode}&gateway=${gateway}&page=1&number=100`,
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
