import axios from "axios";
import { useEffect, useState } from "react";
import { publicGetRules } from "../services/public";
import { getReportPenService } from "../services/report";

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
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
        localStorage.setItem("activeTable", JSON.stringify(res.data));
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
      id: 18,
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
      id: 17,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "gpass",
      label: "پاداش گلکسی پَس",
      text: "Level 4",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 16,
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
      id: 15,
      date: "2022-08-13T18:53:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "levels",
      label: "پاداش افزایش لٍوٍل",
      text: "Level 4",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 14,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "vip",
      label: "VIP Gift",
      text: "VIP Gift",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 13,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "league",
      label: "لیگ روزانه",
      text: "Place 1",
      username: "HangOver",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 12,
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
      id: 11,
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
      id: 10,
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
      id: 9,
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
      id: 8,
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
      id: 6,
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
    {
      id: 7,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "vip",
      label: "VIP Gift",
      text: "VIP Gift",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 5,
      date: "2022-08-13T04:01:53.000+00:00",
      expireDate: "2023-08-12T23:54:03.000+00:00",
      mode: "league",
      label: "لیگ روزانه",
      text: "Place 20",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 4,
      date: "2022-08-13T18:53:53.000+00:00",
      expireDate: "2022-08-13T23:54:03.000+00:00",
      mode: "gift2",
      label: "هدیه",
      text: "Free Gift",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 3,
      date: "2022-08-13T18:53:53.000+00:00",
      expireDate: "2022-08-13T23:54:03.000+00:00",
      mode: "gift3",
      label: "هدیه",
      text: "Free Gift",
      username: "coce",
      status: "Pending",
      received: false,
      amount: 1000000,
    },
    {
      id: 2,
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
  ];

  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService("getLastRewards");
      if (res.status === 200) {
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
