import { useEffect, useState } from "react";

import { siteInfoDef, isJson } from "../const";
import { publicGetRules } from "../services/public";
import { getReportPenService } from "../services/report";
import eventBus from "../services/eventBus";
export const useUser = () => {
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  const [loginToken, setLoginToken] = useState(
    localStorage.getItem(loginKey + "Token") &&
      isJson(localStorage.getItem(loginKey + "Token"))
      ? JSON.parse(localStorage.getItem(loginKey + "Token"))
      : {}
  );
  var _old = loginToken;
  if (
    _old.logout &&
    _old.username == localStorage.getItem("galaxyUserkeyToken")
  ) {
    _old.logout = false;
    setLoginToken(_old);
  }
  useEffect(() => {
    eventBus.on("updateUser", (dataGet) => {
      setLoginToken(dataGet);
      var loginKey = localStorage.getItem("galaxyUserkeyToken");

      localStorage.setItem(loginKey + "Token", JSON.stringify(dataGet));
    });
  }, []);

  return [loginToken];
};
export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState(
    localStorage.getItem("siteInfo") && isJson(localStorage.getItem("siteInfo"))
      ? JSON.parse(localStorage.getItem("siteInfo"))
      : siteInfoDef
  );

  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      if (res.status === 200) {
        if (isJson(res.data)) {
          setSiteInfo(res.data);
          localStorage.setItem("siteInfo", JSON.stringify(res.data));
        }
      }
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
  const [activeTable, setActiveTable] = useState([]);
  const handleGetActiveTable = async () => {
    try {
      const res = await getReportPenService("getActiveTables");
      if (res.status === 200) {
        if (activeTable != res.data && isJson(res.data)) {
          setActiveTable(res.data);
          //setActiveTable(tt);
          //localStorage.setItem("activeTable", JSON.stringify(res.data));
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
      // localStorage.setItem("activeTable", JSON.stringify(dataGet));
    });
  }, []);
  return [activeTable];
};

export const useLastReward = () => {
  const [lastReward, setLastReward] = useState([]);

  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService("getLastRewards?page=1&number=500");

      if (res.status === 200 && isJson(res.data)) {
        var mydataGet = res.data.sort((a, b) => (a.date < b.date ? 1 : -1));
        // localStorage.setItem("lastReward", JSON.stringify(mydataGet));
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
  }, []);
  return [lastReward];
};
