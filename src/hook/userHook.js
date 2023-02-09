import { useEffect, useState } from "react";
import { getReportPenService } from "../services/report";
import eventBus from "../services/eventBus";
export const useUser = () => {
  const [loginToken, setLoginToken] = useState(
    JSON.parse(localStorage.getItem("loginToken"))
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
    JSON.parse(localStorage.getItem("lastReward"))
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
