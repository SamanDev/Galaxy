import React, { useEffect } from "react";

import { Container } from "semantic-ui-react";
import GameInbox from "./GameInbox";
import Banners from "./banners";
//import Index from "./index";
import $ from "jquery";
const moment = require("moment");

const Dashboard = (prop) => {
  const loginToken = prop.loginToken;

  const handleManifest = () => {
    //$('[rel="manifest"]').remove();
    if ($('[rel="manifest"]').length == 0) {
      let dd = window.location.protocol + "//" + window.location.host;
      let sUrl =
        dd +
        "/login/" +
        btoa(loginToken.username) +
        "/" +
        localStorage.getItem(btoa(loginToken.username));

      let manifest = {
        short_name: loginToken.username,
        name: loginToken.username,

        display: "fullscreen",
        theme_color: "#000000",
        orientation: "portrait",

        start_url: sUrl,
        scope: dd,
        id: sUrl,

        background_color: "#000000",
        icons: [
          {
            src: dd + "/maskable_icon_x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },

          {
            src: dd + "/maskable_icon_x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
        ],
        description: "معتبرترین و بهترین اپلیکیشن پوکر با پول واقعی در ایران",
      };
      let content = encodeURIComponent(JSON.stringify(manifest));
      let url = "data:application/manifest+json," + content;
      let element = document.createElement("link");
      element.setAttribute("rel", "manifest");
      element.setAttribute("href", url);
      document.querySelector("head").appendChild(element);
      window.addEventListener("beforeinstallprompt", (e) => {
        //$("#pushactive").trigger("click");
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
      });
      window.addEventListener("focus", () => {
        $("#pushactive").trigger("click");
      });

      setTimeout(function () {
        addHome();
      }, 1000);
    }
  };

  function addHome() {
    window.addEventListener(
      "click",
      async () => {
        console.log("👍", "butInstall-clicked" + window.deferredPrompt);
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          // The deferred prompt isn't available.
          return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        localStorage.removeItem("notificationAllow");
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
      },
      { once: true }
    );
  }

  useEffect(() => {
    handleManifest();
  }, [loginToken?.accessToken]);

  return (
    <>
      <div
        id="dashboard_section"
        className="dashboard_section main_section fadeoutend"
      >
        <Banners {...prop} />
        <div id="game_section" className="dashboard_section main_section">
          <Container>
            <GameInbox {...prop} />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
