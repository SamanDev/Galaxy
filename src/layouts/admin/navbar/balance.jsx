import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Divider,
} from "semantic-ui-react";
import DepositArea from "../forms/index";

import LevelIcon from "../../../utils/LevelIcon";

import BonusArea from "../bonus/index.jsx";
import { doCurrency, levelData, getEvent } from "../../../const";
const moment = require("moment");
const Balance = (prop) => {
  var lvlPercent = 0;
  var gLvlPercent = 0;
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [color, setColor] = useState("grey");
  const [gCount, setGCount] = useState("0");
  const [stateMode, setStateMode] = useState(0);
  var _event = getEvent();
  if (loginToken) {
    if (loginToken.level == 0) {
      loginToken.level = 1;
    }
    var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);
    lvlPercent = parseFloat((loginToken.levelPoint * 100) / _lvlFinal[0].point);
    gLvlPercent = parseFloat((loginToken.glevelPoint * 100) / (5 * 60 * 60));
  }

  const [lvlPercentState, setlvlPercentState] = useState(lvlPercent);
  const ChangeGift = () => {
    var user = JSON.parse(localStorage.getItem("loginToken"));
    if (user) {
      var _bonuses = user?.userGifts;

      var end = Date.now();

      var _pen = _bonuses.filter(
        (d) =>
          d.status == "Pending" &&
          d.received == false &&
          Date.parse(d.date) < end &&
          Date.parse(d.expireDate) > end
      );
      if (_pen.length > 0) {
        setColor("orange");
        setGCount(_pen.length);
      } else {
        setColor("grey");
        setGCount(_pen.length);
      }
    }
  };
  const ChangeStateMode = () => {
    var _n = stateMode;
    _n += 1;
    if (_n > 1 || _event == "League") {
      _n = 0;
    }
    setStateMode(_n);
  };
  useEffect(() => {
    if (_event == "GPass") {
      setStateMode(1);
    }
    if (_event == "VIP") {
      setStateMode(1);
    }
    ChangeGift();
  }, []);
  useEffect(() => {
    if (stateMode == 0) {
      setlvlPercentState(lvlPercent);
    }
    if (stateMode == 1) {
      setlvlPercentState(gLvlPercent);
    }
  }, [stateMode]);
  if (loginToken) {
    return (
      <>
        <Segment
          className="myaccount"
          inverted
          style={{ margin: 0, padding: 10, color: "#fff", top: 3 }}
          onClick={() => {
            ChangeStateMode();
          }}
        >
          {stateMode == 0 && (
            <LevelIcon
              level={loginToken.level}
              icon="star"
              link
              style={{
                position: "relative",
                textAlign: "center",
                top: -3,
              }}
              onClick={() => {
                prop.openPanel(".levels", "#lvl" + loginToken.level);
              }}
            />
          )}
          {stateMode == 1 && _event == "GPass" && (
            <LevelIcon
              icon="google"
              level={loginToken.glevel}
              style={{
                position: "relative",
                textAlign: "center",
                top: -3,
              }}
              onClick={() => {
                prop.openPanel(".gpass", "#lvl" + loginToken.glevel);
              }}
            />
          )}
          {stateMode == 1 && _event == "VIP" && (
            <LevelIcon
              icon="vimeo v"
              level={1}
              number=" "
              style={{
                position: "relative",
                textAlign: "center",
                top: -3,
              }}
              onClick={() => {
                prop.openPanel(".vip", "");
              }}
            />
          )}
          <Label color="black" className="balanceLable">
            {loginToken.username}
          </Label>
          <Label color="black" className="balanceLable amount">
            {doCurrency(loginToken.balance)}
          </Label>
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-50, 0]}
            basic
            pinned
            trigger={
              <Icon
                circular
                size="small"
                inverted
                name="plus"
                color="green"
                link
              />
            }
          >
            <DepositArea
              mode="deposit"
              size="mini"
              labelcolor="orange"
              {...prop}
            />
          </Popup>{" "}
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-78, 0]}
            basic
            pinned
            onClose={() => {
              prop.setActiveMenu("main");
            }}
            trigger={
              <Icon
                circular
                size="small"
                inverted
                color="red"
                name="minus"
                link
              />
            }
          >
            <DepositArea
              mode="cashout"
              size="mini"
              labelcolor="orange"
              {...prop}
            />
          </Popup>{" "}
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-106, 0]}
            basic
            pinned
            trigger={
              <Icon
                circular
                size="small"
                color={color}
                inverted={color == "grey" ? false : true}
                name="gift"
                className={
                  gCount == 0 ? "animated" : "animated heartBeat infinite slow"
                }
                link
              >
                <Label
                  color="red"
                  floating
                  size="mini"
                  className="farsi-inline"
                  hidden={gCount == 0 ? true : false}
                  style={{ top: 5, left: "95%" }}
                >
                  {gCount}
                </Label>
              </Icon>
            }
          >
            <BonusArea {...prop} ChangeGift={ChangeGift} />
          </Popup>
          <Progress
            percent={lvlPercentState}
            inverted
            indicating
            size="tiny"
            className="myprogress"
          />
        </Segment>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
