import React, { useEffect, useState } from "react";

import { sendPushToken } from "./services/auth.js";
import { Message, Divider } from "semantic-ui-react";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 20000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function Active(prop) {
  const [token, setToken] = useState("err");

  var notification = { title: "test", body: "Your match is ow started" };
  const handleResend = () => {
    var firebaseConfig = {
      apiKey: "AIzaSyA4NlmazdAOEweehYLywZgOGtUm_INKAA0",
      authDomain: "galaxy-c1178.firebaseapp.com",
      projectId: "galaxy-c1178",
      storageBucket: "galaxy-c1178.appspot.com",
      messagingSenderId: "231752062766",
      appId: "1:231752062766:web:ccbea905f9e9826d060cbf",
      measurementId: "G-FMV4J1CL20",
    };
    var token = "";
    try {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          "BFAbfAsO0l8yKhmFk8g8qlrKQpEiCaIwSIKjAmvHunOCYs_oH_E1VeSfd4wd5EAEw7aO8oN7ZKDSNoX7vsdzYDU",
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            //  console.log("currentToken : " + currentToken);
            //  userService.sendPushToken(currentToken);
            token = currentToken;

            setToken(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // setToken("err");
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          setToken("err");
          // ...
        });
      onMessage(getMessaging(), (message) => {
        Toast.fire({
          icon: "success",
          title: message.notification.body,
        });

        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (token && token != "err") sendPushToken(token);
  }, [token]);
  useEffect(() => {
    try {
      Notification.requestPermission().then(function (result) {
        if (result === "default" && token == "err") {
          setToken(null);
          return;
        }

        handleResend();
      });
    } catch (e) {
      setToken("err");
    }
  }, []);
  if (token == null) {
    return (
      <>
        <Message negative onClick={handleResend} style={{ cursor: "pointer" }}>
          <Message.Header>Turn On Notification and Get Reward</Message.Header>
        </Message>

        <Divider hidden />
      </>
    );
  } else {
    return null;
  }
}
export default Active;
