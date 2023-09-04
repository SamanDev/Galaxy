import { useEffect, useState } from "react";

import { siteInfoDef, isJson } from "../const";
import { publicGetRules } from "../services/public";
import { getReportPenService } from "../services/report";
import eventBus from "../services/eventBus";
import $ from "jquery";
function sendMessage(message) {
  try {
    const iframe = document.querySelector("iframe[name=gameframe]");
    iframe.contentWindow.postMessage(message, "*");
  } catch (error) {}
}
export const useUser = () => {
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  const [loginToken, setLoginToken] = useState(
    localStorage.getItem(loginKey + "Token") &&
      isJson(localStorage.getItem(loginKey + "Token"))
      ? JSON.parse(localStorage.getItem(loginKey + "Token"))
      : {}
  );
  const [loginTokenUpdate, setLoginTokenUpdate] = useState(loginToken);
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
      //if ($(".mm-menu--opened:visible").length == 0) {
      setLoginToken(dataGet);
      // }
      setLoginTokenUpdate(dataGet);
      var loginKey = localStorage.getItem("galaxyUserkeyToken");
      if (loginKey) {
        localStorage.setItem(loginKey + "Token", JSON.stringify(dataGet));
      }
    });
  }, []);
  useEffect(() => {
    var newu = {
      username: loginTokenUpdate.username,
      balance: loginTokenUpdate.balance,
      balance2: loginTokenUpdate.balance2,
      image: loginTokenUpdate.level,
    };
    try {
      sendMessage(newu);
    } catch (error) {}
  }, [loginTokenUpdate]);

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
