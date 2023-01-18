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
  var tt = {
    Status: [
      "Waiting: 0/2",
      "Playing: 3",
      "Playing: 4",
      "Playing: 5",
      "Playing: 7",
      "Waiting: 0/2",
      "Playing: 3",
      "Playing: 5",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 3",
      "Playing: 5",
      "Playing: 8",
      "Playing: 8",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 6",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 8",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 8",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 5",
      "Playing: 5",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 4",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 1/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
    ],
    BigBlind: [
      1000, 500, 500, 1000, 1000, 2000, 2000, 2000, 4000, 6000, 4000, 6000,
      4000, 4000, 6000, 10000, 10000, 10000, 10000, 20000, 20000, 10000, 20000,
      15000, 30000, 30000, 15000, 30000, 40000, 40000, 20000, 40000, 50000,
      50000, 25000, 50000, 100000, 100000, 50000, 100000, 50000, 200000, 200000,
      100000, 200000, 400000, 400000, 200000, 400000, 500000, 500000, 500000,
      1000000, 1000000, 500000, 1000000, 500000,
    ],
    SmallBlind: [
      500, 250, 250, 500, 500, 1000, 1000, 1000, 2000, 3000, 2000, 3000, 2000,
      2000, 3000, 5000, 5000, 5000, 10000, 10000, 10000, 10000, 10000, 15000,
      15000, 15000, 15000, 15000, 20000, 20000, 20000, 20000, 25000, 25000,
      25000, 25000, 50000, 50000, 50000, 50000, 50000, 100000, 100000, 100000,
      100000, 200000, 200000, 200000, 200000, 250000, 250000, 250000, 500000,
      500000, 500000, 500000, 500000,
    ],
    RingGames: 57,
    Result: "Ok",
    Name: [
      "00 HO 500-1K (8)",
      "00 OM5 250-500 (5)",
      "00 OM5 250-500 (8)",
      "00 OM5 500-1K (5)",
      "00 OM5 500-1K (8)",
      "01 HO 1K-2K (8)",
      "01 OM 1K-2K (7)",
      "01 OM5 1K-2K (8)",
      "02 HO 2K-4K (8)",
      "02 HO 3K-6K (7)",
      "02 OM 2K-4K (7)",
      "02 OM 3K-6K (6)",
      "02 OM5 2K-4K (5)",
      "02 OM5 2K-4K (8)",
      "02 OM5 3K-6K (8)",
      "03 HO 5K-10K (8)",
      "03 OM 5K-10K (8)",
      "03 OM5 5K-10K (8)",
      "04 HO 10K-10K (8)",
      "04 HO 10K-20K (8)",
      "04 OM 10K-20K (8)",
      "04 OM5 10K-10K (8)",
      "04 OM5 10K-20K (8)",
      "05 HO 15K-15K (8)",
      "05 HO 15K-30K (8)",
      "05 OM 15K-30K (7)",
      "05 OM5 15K-15K (8)",
      "05 OM5 15K-30K (8)",
      "06 HO 20K-40K (8)",
      "06 OM 20K-40K (7)",
      "06 OM5 20K-20K (8)",
      "06 OM5 20K-40K (8)",
      "07 HO 25K-50K (8)",
      "07 OM 25K-50K (8)",
      "07 OM5 25K-25K (8)",
      "07 OM5 25K-50K (8)",
      "08 HO 50K-100K (8) - VIP",
      "08 OM 50K-100K (7) - VIP",
      "08 OM 50K-50K (7) - VIP",
      "08 OM5 50K-100K (8) - VIP",
      "08 OM5 50K-50K (8) - VIP",
      "09 HO 100K-200K (8) - VIP",
      "09 OM 100K-200K (7) - VIP",
      "09 OM5 100K-100K (8) - VIP",
      "09 OM5 100K-200K (8) - VIP",
      "10 HO 200K-400K (8) - VIP",
      "10 OM 200K-400K (7) - VIP",
      "10 OM5 200K-200K (8) - VIP",
      "10 OM5 200K-400K (8) - VIP",
      "11 HO 250K-500K (8) - Royal",
      "11 OM 250K-500K (7) - Royal",
      "11 OM5 250K-500K (8) - Royal",
      "12 HO 500K-1M (8) - Royal",
      "12 OM 500K-1M (7) - Royal",
      "12 OM 500K-500K (7) - Royal",
      "12 OM5 500K-1M (8) - Royal",
      "12 OM5 500K-500K (8) - Royal",
    ],
    Seats: [
      8, 5, 8, 5, 8, 8, 7, 8, 8, 7, 7, 6, 5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      7, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 7, 7, 8, 8, 8, 7, 8, 8, 8, 7, 8, 8, 8,
      7, 8, 8, 7, 7, 8, 8,
    ],
  };
  const [activeTable, setActiveTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetActiveTable = async () => {
    try {
      const res = await getReportPenService("getActiveTables");
      if (res.status === 200) {
        //setActiveTable(res.data);
        setActiveTable(tt);
        localStorage.setItem("activeTable", JSON.stringify(tt));
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
        // setLastReward(res.data);
        localStorage.setItem("lastReward", JSON.stringify(res.data));
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
