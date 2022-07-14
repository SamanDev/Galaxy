import httpService from "./httpService";

export const getReportService = (id = null, mode = "all") => {
  return httpService(
    `/req/getReportsByUser/?id=${id}&mode=${mode}&page=1&number=100`,
    "get"
  );
};
