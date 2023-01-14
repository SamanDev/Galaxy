import { httpService } from "./httpService";

export const getRewardsService = (id = null, mode = "", username = "") => {
  if (id) {
    return httpService(
      `/req/getLastRewards/?id=${id}&mode=${mode}&username=${username}&page=1&number=100`,
      "get"
    );
  } else {
    return httpService(
      `/req/getLastRewards/?mode=${mode}&page=1&number=100`,
      "get"
    );
  }
};
