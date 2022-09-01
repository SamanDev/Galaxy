import axios from "axios";
import { useEffect, useState } from "react";
import { publicGetService } from "../services/public";

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
