import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import UserWebsocket from "../services/user.websocket";
export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    try {
      const res = await getUserService();
      setIsLogin(res.status == 200 ? true : false);
      if (res.status == 200 && res.data?.accessToken) {
        UserWebsocket.connect(
          res.data.accessToken + "&user=" + res.data.username,
          res.data
        );
      }

      setLoading(false);
    } catch (error) {
      setIsLogin(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));

    if (
      loginToken &&
      window.location.href.toString().indexOf("/logout") == -1
    ) {
      handleCheckLogin();
    } else {
      setIsLogin(false);
      setLoading(false);
    }
  }, []);

  return [loading, isLogin];
};
