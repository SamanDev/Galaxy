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
      : null
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
    localStorage.getItem("activeTable")
      ? JSON.parse(localStorage.getItem("activeTable"))
      : []
  );
  const handleGetActiveTable = async () => {
    try {
      const res = await getReportPenService("getActiveTables");
      if (res.status === 200) {
        if (activeTable != res.data) {
          setActiveTable(res.data);
          //setActiveTable(tt);
          localStorage.setItem("activeTable", JSON.stringify(res.data));
        }
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetActiveTable();

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

  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService("getLastRewards?page=1&number=500");

      if (res.status === 200) {
        var mydataGet = res.data.sort((a, b) => (a.date < b.date ? 1 : -1));
        localStorage.setItem("lastReward", JSON.stringify(mydataGet));
        setLastReward(mydataGet);
      }
    } catch (error) {
      //console.log(error.message);
      // setLastReward(_bonuses);
      //localStorage.setItem("lastReward", JSON.stringify(_bonuses));
    }
  };

  useEffect(() => {
    handleGetLastReward();

    eventBus.on("updateLastReward", (dataGet) => {
      try {
        var _lastReward = JSON.parse(localStorage.getItem("lastReward")).sort(
          (a, b) => (a.date < b.date ? 1 : -1)
        );
      } catch (error) {
        var _lastReward = [];
      }

      _lastReward = [dataGet].concat(_lastReward);
      localStorage.setItem("lastReward", JSON.stringify(_lastReward));
      setLastReward(_lastReward);
    });
  }, []);
  return [lastReward];
};
