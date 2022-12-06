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
