import React, { useState, useEffect } from "react";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import DepositArea from "../forms/index";

import LevelIcon from "../../../utils/svg";
import CountUp from "../../../utils/CountUp";
import RisingPitch from "../../../utils/PlayBip";
import BonusArea from "../bonus/index.jsx";
import $ from "jquery";
//import BonusArea from "../../../pages/dashboard/ActiveTableJson";
import {
  doCurrency,
  getEvent,
  levelClassInside,
  levelDataInfo,
} from "../../../const";
const moment = require("moment");
const Balance = (prop) => {
  var lvlPercent = 0;
  var gLvlPercent = 0;
  var vLvlPercent = 0;
  const siteInfo = prop.siteInfo;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  var levelData = siteInfo?.levelUps;
  const loginToken = prop.loginToken;

  const [color, setColor] = useState("grey");
  const [gCount, setGCount] = useState(0);
  const [stateMode, setStateMode] = useState(0);

  var _event = getEvent();

  const [lvlPercentState, setlvlPercentState] = useState(lvlPercent);
  const ChangeGift = () => {
    var user = loginToken;
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
    if (_n > 1) {
      _n = 0;
    }
    setStateMode(_n);
  };
  const openProfile = () => {
    prop.setUserProfile(loginToken.username);
    prop.setUserOpen(true);
  };
  useEffect(() => {
    if (_event == "GPass" && !loginToken.takeGPass) {
      setStateMode(1);
    }
    if (_event == "VIP") {
      setStateMode(1);
    }
    if (_event == "League") {
      setStateMode(1);
    }
  }, []);
  useEffect(() => {
    if (loginToken && levelData) {
      var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);

      lvlPercent = parseFloat(
        (loginToken.levelPoint * 100) / _lvlFinal[0].point
      ).toFixed(2);
      gLvlPercent = parseFloat(
        (loginToken.glevelSecond * 100) / (gpassrules.hoursLimit * 3600)
      ).toFixed(2);
      vLvlPercent = parseFloat(
        (loginToken.vipPlaySecond * 100) / (viprules.hoursLimit * 3600)
      ).toFixed(2);
      if (gLvlPercent > 100) {
        gLvlPercent = 100;
      }
      if (lvlPercent > 100) {
        lvlPercent = 100;
      }
      if (vLvlPercent > 100) {
        vLvlPercent = 100;
      }
    }
    if (stateMode == 0) {
      setlvlPercentState(lvlPercent);
    }
    if (stateMode == 1 && _event == "GPass") {
      setlvlPercentState(gLvlPercent);
    }
    if (stateMode == 1 && _event == "VIP") {
      setlvlPercentState(vLvlPercent);
    }
  }, [stateMode, loginToken]);
  useEffect(() => {
    if (gCount > 0) {
      //$("#playbip").trigger("click");
    }
  }, [gCount]);
  useEffect(() => {
    ChangeGift();
  });
  if (loginToken) {
    return (
      <>
        <Segment
          className="myaccount"
          inverted
          style={{ margin: 0, padding: 10, color: "#fff" }}
        >
          <RisingPitch />
          <span
            onClick={() => {
              ChangeStateMode();
            }}
          >
            {stateMode == 0 && (
              <span style={{ top: -2, position: "relative" }}>
                <LevelIcon
                  level={loginToken.level}
                  text=""
                  mode="levels"
                  classinside={levelClassInside(loginToken.level)}
                  number=""
                  width="38px"
                />
              </span>
            )}
            {stateMode == 1 && _event == "GPass" && (
              <LevelIcon
                mode="gpass"
                level={loginToken.glevel}
                classinside="iconinside0"
                number={loginToken.glevel}
                text=""
                width="38px"
              />
            )}
            {stateMode == 1 && _event == "VIP" && (
              <LevelIcon
                classinside="iconinside0"
                number=""
                text=""
                width="38px"
                level={1}
                mode="vip"
              />
            )}
            {stateMode == 1 && _event == "League" && (
              <LevelIcon
                classinside="iconinside0"
                number=""
                text=""
                width="38px"
                level={1}
                mode="league"
              />
            )}
            <Label
              color="black"
              className="balanceLable"
              onClick={() => {
                openProfile();
              }}
            >
              {loginToken.username}
            </Label>
          </span>
          <Label
            color="black"
            className="balanceLable amount"
            onClick={() => {
              $("#opendepicon").trigger("click");
            }}
          >
            <CountUp balance={loginToken.balance} />
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
                id="opendepicon"
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
            hideOnScroll
            disabled={gCount == -1 ? true : false}
            trigger={
              <Icon
                circular
                size="small"
                color={color}
                inverted={color == "grey" ? false : true}
                name="gift"
                className={
                  gCount == 0 ? "animated" : "animated heartBeat  slow"
                }
                link
              >
                <Label
                  color="red"
                  floating
                  size="mini"
                  className="farsi-inline"
                  hidden={gCount == 0 ? true : true}
                  style={{ top: 5, left: "95%" }}
                >
                  {gCount}
                </Label>
              </Icon>
            }
          >
            <BonusArea {...prop} ChangeGift={ChangeGift} />
          </Popup>
          <Popup
            trigger={
              <Progress
                percent={lvlPercentState}
                inverted
                indicating
                size="tiny"
                className="myprogress"
              />
            }
            size="mini"
            inverted
            content={"%" + lvlPercentState}
            position="bottom center"
          />
        </Segment>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
