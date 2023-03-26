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

    try {
      var loginToken = JSON.parse(localStorage.getItem(loginKey + "Token"));
      if (
        loginToken?.accessToken &&
        window.location.href.toString().indexOf("/logout") == -1
      ) {
        handleCheckLogin();
      } else {
        if (!loginToken?.accessToken) {
          UserWebsocket.connect();
          localStorage.removeItem(loginKey + "Token");
          localStorage.setItem("balance", 0);
          setIsLogin(false);
          setLoading(false);
          localStorage.removeItem("galaxyUserkeyToken");
        } else {
          UserWebsocket.connect();
          setIsLogin(false);
          setLoading(false);
        }
        UserWebsocket.connect();
        setIsLogin(false);
        setLoading(false);
      }
    } catch (error) {
      UserWebsocket.connect();
      localStorage.removeItem(loginKey + "Token");
      localStorage.setItem("balance", 0);
      setIsLogin(false);
      setLoading(false);
      localStorage.removeItem("galaxyUserkeyToken");
    }
  }, []);

  return [loading, isLogin];
};
