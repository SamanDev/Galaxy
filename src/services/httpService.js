import axios from "axios";
import { Alert } from "../utils/alerts";
import config from "./config.json";
import UserWebsocket from ".//user.websocket";
export const apiPath = config.onlinePath;
export function checkBlock(data) {
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  if (loginToken) {
    if (loginToken.username == data.username) {
      if (!data.userBlock) {
        localStorage.setItem("loginToken", JSON.stringify(data));

        UserWebsocket.connect(
          data.accessToken + "&user=" + data.username,
          data
        );
      } else {
        window.location = "/logout";
      }
    }
  } else {
    if (!data.userBlock) {
      localStorage.setItem("loginToken", JSON.stringify(data));

      UserWebsocket.connect(data.accessToken + "&user=" + data.username, data);
    } else {
      UserWebsocket.connect();
      // window.location = "/";
    }
  }
}
axios.interceptors.response.use(
  (res) => {
    if (res.status == 200) {
      if (res.data?.accessToken) {
        checkBlock(res.data);
      }
    }
    if (res.status != 200 && res.status != 201) {
      if (typeof res.data == "object") {
        let message = "";
        for (const key in res.data) {
          message = message + `${key} : ${res.data[key]}`;
        }
        res.data.message = message;
      }
      Alert("مشکل...!", res.data.message, "warning");
    }
    return res;
  },
  (error) => {
    if (error.response.status == 401) {
      //window.location = "/logout";
      localStorage.removeItem("loginToken");
      UserWebsocket.connect();
    }

    Alert(error.response.status, error.response.data.message, "error");
    return Promise.reject(error);
  }
);

export const httpService = (url, method, data = null) => {
  const tokenInfo = JSON.parse(localStorage.getItem("loginToken"));
  return axios({
    url: apiPath + "/api" + url,
    method,
    data,
    headers: {
      Authorization: tokenInfo ? `LooLe  ${tokenInfo.accessToken}` : null,
    },
  });
};
