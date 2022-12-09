import axios from "axios";
import { useEffect, useState } from "react";
import { publicGetService } from "../services/public";
import { getReportPenService } from "../services/report";

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    try {
      const res = await publicGetService();
      setSiteInfo(res.data);
      localStorage.setItem("siteInfo", JSON.stringify(res.data));
      setLoading(false);
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
        setActiveTable(res.data);
      }
    } catch (error) {
      console.log(error.message);
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
  var _bonuses = [
    {
      id: 6,
      date: "2022-08-13T18:53:53.000+00:00",
      expireDate: "2022-08-13T23:54:03.000+00:00",
      mode: "gift1",
      label: "هدیه",
      text: "Free Gift",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 5,
      date: "2022-08-12T18:53:53.000+00:00",
      expireDate: "2022-08-12T23:54:03.000+00:00",
      mode: "bonus",
      label: "بوناس",
      text: "%5 Bonus",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 4,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2022-08-13T23:54:03.000+00:00",
      mode: "commission",
      label: "کمیسیون",
      text: "Commission",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1040000,
    },
    {
      id: 3,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "gpass",
      label: "پاداش گلکسی پَس",
      text: "Level 10",
      username: "m11001100mWW",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 2,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2022-08-13T23:54:03.000+00:00",
      mode: "rakeback",
      label: "ریک بک",
      text: "Rakeack",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1040000,
    },
    {
      id: 1,
      date: "2022-08-13T18:53:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "levels",
      label: "پاداش افزایش لٍوٍل",
      text: "Level 55",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
  ];
  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService("getLastReward");
      if (res.status === 200) {
        setLastReward(res.data);
        //setLastReward(_bonuses);
      }
    } catch (error) {
      //console.log(error.message);
      //setLastReward(_bonuses);
    }
  };

  useEffect(() => {
    handleGetLastReward();
  }, []);

  return [loading, lastReward];
};
