import { useEffect, useState } from "react";

import { publicGetRules } from "../services/public";
import { getReportPenService } from "../services/report";
import eventBus from "../services/eventBus";
export const useUser = () => {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("loginToken")
      ? JSON.parse(localStorage.getItem("loginToken"))
      : null
  );

  useEffect(() => {
    eventBus.on("updateUser", (dataGet) => {
      console.log(dataGet);
      setLoginToken(dataGet);
      localStorage.setItem("loginToken", JSON.stringify(dataGet));
    });
  }, []);
  return [loginToken];
};
export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState(
    localStorage.getItem("siteInfo")
      ? JSON.parse(localStorage.getItem("siteInfo"))
      : []
  );

  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      setSiteInfo(res.data);
      localStorage.setItem("siteInfo", JSON.stringify(res.data));
    } catch (error) {}
  };
  useEffect(() => {
    handleCheckLogin();
    eventBus.on("updateSiteInfo", (dataGet) => {
      setSiteInfo(dataGet);
      localStorage.setItem("siteInfo", JSON.stringify(dataGet));
    });
  }, []);

  return [siteInfo];
};
export const useActiveTable = () => {
  const [activeTable, setActiveTable] = useState(
    JSON.parse(localStorage.getItem("activeTable"))
  );

  useEffect(() => {
    eventBus.on("updateActiveTables", (dataGet) => {
      setActiveTable(dataGet);
      localStorage.setItem("activeTable", JSON.stringify(dataGet));
    });
  }, []);
  return [activeTable];
};

export const useLastReward = () => {
  const [lastReward, setLastReward] = useState(
    localStorage.getItem("lastReward")
      ? JSON.parse(localStorage.getItem("lastReward"))
      : []
  );

  useEffect(() => {
    eventBus.on("updateLastReward", (dataGet) => {
      var mydataGet = dataGet.sort((a, b) => (a.id < b.id ? 1 : -1));
      setLastReward(mydataGet);
      localStorage.setItem("lastReward", JSON.stringify(mydataGet));
    });
  }, []);
  return [lastReward];
};
