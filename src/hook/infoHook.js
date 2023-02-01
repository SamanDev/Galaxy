import axios from "axios";
import { useEffect, useState } from "react";
import { publicGetRules } from "../services/public";
import { getReportPenService } from "../services/report";
import { adminGetService } from "../services/admin";
import { addDays } from "date-fns";
const moment = require("moment");
export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      setSiteInfo(res.data);
      localStorage.setItem("siteInfo", JSON.stringify(res.data));
      //setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleCheckLogin();
  }, []);

  return [loading, siteInfo];
};

export const useActiveTable = () => {
  const [activeTable, setActiveTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetActiveTable = async () => {
    try {
      const res = await getReportPenService("getActiveTables");
      if (res.status === 200) {
        //setActiveTable(res.data);
        //setActiveTable(tt);
        localStorage.setItem("activeTable", JSON.stringify(res.data));
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetActiveTable();
  }, []);

  return [loading, activeTable];
};

export const useLastReward = () => {
  const [lastReward, setLastReward] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService("getLastRewards");

      if (res.status === 200) {
        localStorage.setItem("lastReward", JSON.stringify(res.data));
        //setLastReward(res.data);
        //setLastReward(_bonuses);
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
  return [loading, lastReward];
};
export const useAdminTicket = () => {
  const [tickets, setTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  var startDate = addDays(new Date(), -6);
  var endDate = new Date();
  var _s = moment(startDate).format("YYYY-MM-DD");
  var _e = moment(endDate).format("YYYY-MM-DD");
  const handleGetTickets = async () => {
    try {
      const res = await adminGetService(
        `getTickets?page=1&number=500&status=Open&start=${_s}&end=${_e}`
      );

      if (res.status === 200) {
        setTickets(
          res.data
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .filter(
              (item) =>
                item.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
                  .adminUser == item.username
            ).length
        );
      }
    } catch (error) {
      //console.log(error.message);
      // setLastReward(_bonuses);
      //localStorage.setItem("lastReward", JSON.stringify(_bonuses));
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetTickets();
  }, []);
  return [loading, tickets];
};
