import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import UserWebsocket from "../services/user.websocket";
export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    setLoading(true);
    try {
      const res = await getUserService();
      setIsLogin(res.status == 200 ? true : false);

      setLoading(false);
    } catch (error) {
      UserWebsocket.connect();
      setIsLogin(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    var loginKey = localStorage.getItem("galaxyUserkeyToken");

    var loginToken = JSON.parse(localStorage.getItem(loginKey + "Token"));

    if (
      loginToken?.accessToken &&
      window.location.href.toString().indexOf("/logout") == -1
    ) {
      handleCheckLogin();
    } else {
      UserWebsocket.connect();
      setIsLogin(false);
      setLoading(false);
    }
  }, []);

  return [loading, isLogin];
};
