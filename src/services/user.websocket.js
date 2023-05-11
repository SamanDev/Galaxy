import { USERSOCKETURL, USERSOCKETPUBLICURL } from "../const";
import eventBus from "./eventBus";

var ws;
var ws2;
var res = false;
var timeout = 35000;
var timerId;
var usr;
var tkn;
var count = 0;

class UserWebsocket {
  connect(token, user) {
    if (token) {
      if (ws == null || ws == ws2) {
        usr = user;
        tkn = token;
        ws?.close();
        ws2 = null;
        ws = new WebSocket(USERSOCKETURL + token);
        console.log("Websocket user is connected");
      }
    } else {
      if (ws2 == null) {
        ws?.close();
        ws = null;
        ws2 = new WebSocket(USERSOCKETPUBLICURL);
        console.log("Websocket public is connected");
        ws = ws2;
      }
    }
    //eventBus.dispatch("LastReward", _bonuses);
    //eventBus.dispatch("eventsConnect", "");
    //userService.getEvents();
    //localStorage.removeItem("events");
    //userService.getEvents();

    ws.onopen = function live() {
      if (count > 10) {
        eventBus.dispatch("eventsDC", "");
      }

      if (!res) {
        count++;
        if (timerId) {
          clearInterval(timerId);
        }
        timerId = setInterval(live, timeout);
      }
      try {
        if (ws?.readyState == ws?.OPEN) {
          if (ws) {
            if (!res) {
              eventBus.dispatch("eventsConnect", "");
            }
            // eventBus.dispatch("LastReward", _bonuses)
            count = 0;
            console.log("Socket is connected.");
            res = false;
          }
        }
      } catch (e) {}

      ws.onmessage = function (data) {
        var message = data.data;
        //  new UserWebsocket().serverMessage(data.data);
        function isJson(str) {
          // alert("str00 = "+str)
          try {
            JSON.parse(str);
          } catch (e) {
            // alert('no JSON')
            return false;
          }
          // alert('yes JSON')
          return true;
        }
        if (isJson(message)) {
          var msg = JSON.parse(message);

          //alert((msg.Command))
          if (msg.Command === "updateUser") {
            eventBus.dispatch("updateUser", msg.data);
          } else if (msg.Command === "ActiveTables") {
            eventBus.dispatch("updateActiveTables", msg.data);
          } else if (msg.Command === "pushLastRewards") {
            eventBus.dispatch("updateLastReward", msg.data);
          } else if (msg.Command === "updateSetting") {
            eventBus.dispatch("updateSiteInfo", msg.data);
          }
        } else {
          if (message === "closeConnection") {
            //localStorage.removeItem("getGateways");

            // localStorage.clear();
            //window.location.reload();

            ws?.close();
            ws = null;
            eventBus.dispatch("eventsDC", "");
          } else if (message === "PasswordChanged") {
            eventBus.dispatch(
              "eventsDataPass",
              "Your password has been updated."
            );
          } else if (message === "AccountActivated") {
            eventBus.dispatch(
              "eventsDataActive",
              "Your account has been activated."
            );
            //eventBus.dispatch("eventsDC", '');
          } else if (message == "Pong") {
            res = true;
          }
        }
      };
      ws.onerror = function (e) {
        setTimeout(function () {
          clearInterval(timerId);

          ws = null;
          ws2 = null;
          res = false;
        }, 200);
        if (e.type === "error") {
          //localStorage.setItem("user", JSON.stringify(defUser));
          //eventBus.dispatch("eventsDC", "");
          // localStorage.clear();
          //window.location.reload();
          //window.location.replace("/auth/login-page");
        }
      };
      ws.onclose = function (e) {
        setTimeout(function () {
          ws = null;
          ws2 = null;
          res = false;
          console.log("Socket is disconnected.");
          clearInterval(timerId);
          timerId = null;
          ws = new WebSocket(USERSOCKETURL + tkn);
          live();
          if (ws2 == null && token) {
            // eventBus.dispatch("eventsDC", "");
          }
        }, 500);
        //ws?.close();
        //ws = null;
        //  console.log(ws);
        //  console.log(token);
        // localStorage.setItem("user", JSON.stringify(defUser));
        //eventBus.dispatch("eventsDC", "");
        /*  setTimeout(function () {
          if (ws != null) {
            eventBus.dispatch("eventsConnect", "");
          } else {
            if (ws == null && token) {
              eventBus.dispatch("eventsDC", "");
            }
          }
        }, 200);*/
      };
    };
  }

  disconnect() {
    if (ws != null) {
      ws?.close();
      ws = null;
      //   ws = null;
      //eventBus.dispatch("eventsDC", "");
      console.log("Websocket is in disconnected state");
      //eventBus.dispatch("eventsDC", "");
    } else {
      //ws?.close();
      eventBus.dispatch("eventsDC", "");
    }
  }

  sendData(data) {
    ws.send(data);
  }
}

export default new UserWebsocket();
