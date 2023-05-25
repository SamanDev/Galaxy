import { USERSOCKETURL, USERSOCKETPUBLICURL } from "../const";
import eventBus from "./eventBus";

var ws;
var ws2;
var res = false;
var timeout = 35000;
var timerId;
var usr;
var tkn;


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
      console.log("Socket is connected.")
   /*  if(!res){
     
      if(timerId){
      clearInterval(timerId);
     }
      timerId = setInterval( live, timeout);
     }
     try{
      if (ws?.readyState == ws?.OPEN) {
        if (ws) {
          if(!res){
          eventBus.dispatch("eventsConnect", "");
          }
              console.log("Socket is connected.")
              res = false;
             
        }
      
      }
     }catch(e){
     
     }*/
    
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
         //   clearInterval(timerId);
         //   timerId = null;
         ws?.close();
         //   ws = null;
         //   ws2 = null;
         //   eventBus.dispatch("eventsDC", "");
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
      /*  console.log("err: "+e);
        setTimeout(function () {
        
          clearInterval(timerId);
     
        ws = null;
        ws2 = null;
        res = false;
      }, 200);*/
        if (e.type === "error") {
          //localStorage.setItem("user", JSON.stringify(defUser));
          //eventBus.dispatch("eventsDC", "");
          // localStorage.clear();
          //window.location.reload();
          //window.location.replace("/auth/login-page");
        }
      };
      ws.onclose = function (e) {
      //  clearInterval(timerId);
      //  timerId = null;
        ws = null;
        ws2 = null;
        console.log("Websocket is in disconnected state");
        eventBus.dispatch("eventsDC", "");
      };
    };
  }

  disconnect() {
  //  clearInterval(timerId);
  //  timerId = null;
  //  ws = null;
  //  ws2 = null;
  //  eventBus.dispatch("eventsDC", "");
    ws?.close();
  }

  sendData(data) {
    ws.send(data);
  }
}

export default new UserWebsocket();
