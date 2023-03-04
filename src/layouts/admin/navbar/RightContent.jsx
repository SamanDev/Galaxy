import React, { useState, useEffect } from "react";

import $ from "jquery";
import {
  Label,
  Header,
  Loader,
  Dimmer,
  Segment,
  Dropdown,
} from "semantic-ui-react";
import Tour from "../../../Tour";
import { loginService, getUserService } from "../../../services/auth";
import eventBus from "../../../services/eventBus";
const Rightcontent = (prop) => {
  const activePanel = prop.activePanel;
  const [loading, setLoading] = useState(false);

  const keysArea = () => {
    var loginKey = localStorage.getItem("galaxyUserkeyToken");
    var loginToken = JSON.parse(localStorage.getItem(loginKey + "Token"));
    if (!loginToken?.accessToken) return null;
    var _key = [
      {
        key: "1",
        text: loginToken.username,
        value: loginToken.username,
        active: true,
        hidden: true,
        image: {
          avatar: true,
          src: "/assets/images/stars/lvl" + loginToken.level + ".png",
        },
      },
    ];
    for (var key in localStorage) {
      if (
        key.indexOf("Token") > -1 &&
        key.replace("Token", "") !== loginKey &&
        key != "galaxyUserkeyToken"
      ) {
        var loginToken = JSON.parse(localStorage.getItem(key));
        _key.push({
          key: loginToken.username,
          text: loginToken.username,
          value: loginToken.username,
          image: {
            avatar: true,
            src: "/assets/images/stars/lvl" + loginToken.level + ".png",
          },
        });
      }
    }
    if (_key.length == 1) return null;

    return (
      <div
        style={{
          right: 130,
          position: "absolute",
          top: 20,
          color: "white",
          zindex: 1000000,
        }}
      >
        <Dropdown
          labeled
          basic
          pointing="top right"
          options={_key}
          defaultValue={_key[0].value}
          onChange={handleChange}
        />
      </div>
    );
  };
  const handleCheckLogin = async (value) => {
    setLoading(true);
    try {
      const res = await getUserService();
      if (res.status == 200) {
        var loginToken = JSON.parse(
          localStorage.getItem(res.data.username + "Token")
        );

        eventBus.dispatch("updateUser", loginToken);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (localStorage.getItem("galaxyUserkeyToken")) {
        localStorage.setItem(
          "oldgalaxyUserkey",
          localStorage.getItem("galaxyUserkeyToken")
        );
        localStorage.removeItem("galaxyUserkeyToken");
      }
      prop.setFirstOpen(true);
    }
  };
  const handleChange = (e, { value }) => {
    var _old = prop.loginToken;
    _old.logout = true;
    eventBus.dispatch("updateUser", _old);
    localStorage.setItem("galaxyUserkeyToken", value);
    //handleCheckLogin(value);
    window.location.reload();
  };
  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader className="farsi-inline" size="large">
            لطفا صبر کنید...
          </Loader>
        </Dimmer>
      )}

      <div className="right_content  d-flex">
        <Segment
          basic
          className="step1click"
          style={{
            color: "#fff",
            position: "absolute",
            top: 8,
            right: 5,
            opacity: 1,
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            prop.setActivePanel(!activePanel);
            $(".picn").toggleClass("open");
          }}
        >
          <div id="nav-icon1" className="picn step1">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Segment>
        <Tour /> {keysArea()}
      </div>
    </>
  );
};

export default Rightcontent;
