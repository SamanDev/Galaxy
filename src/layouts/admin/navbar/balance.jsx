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

import LevelIcon from "../../../utils/svg";
import RisingPitch from "../../../pages/admin/PlayBip";
import RisingPitchReward from "../../../pages/admin/PlayReward";
import BonusArea from "../bonus/index.jsx";
import $ from "jquery";
//import BonusArea from "../../../pages/dashboard/ActiveTableJson";
import {
  doCurrency,
  levelData,
  getEvent,
  levelClassInside,
} from "../../../const";
var _bonuses = [
  {
    id: 4,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "commission",
    label: "کمیسیون",
    text: "Commission",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 6,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "gpass",
    label: "پاداش گلکسی پَس",
    text: "Level 15",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 6,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "gpass",
    label: "پاداش گلکسی پَس",
    text: "Level 1",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 5,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "rakeback",
    label: "ریک بک",
    text: "Rakeack",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 1,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "levels",
    label: "پاداش افزایش لٍوٍل",
    text: "Level 59",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 7,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "vip",
    label: "VIP Gift",
    text: "VIP Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 8,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "league",
    label: "لیگ روزانه",
    text: "Place 1",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift3",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift2",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift1",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 2,
    date: "2022-08-12T18:53:53.000+00:00",
    expireDate: "2022-08-12T23:54:03.000+00:00",
    mode: "bonus",
    label: "بوناس",
    text: "%5 Bonus",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
];
const moment = require("moment");
const Balance = (prop) => {
  var lvlPercent = 0;
  var gLvlPercent = 0;
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [color, setColor] = useState("grey");
  const [gCount, setGCount] = useState("0");
  const [stateMode, setStateMode] = useState(0);
  const handleConfirmTest = (bonus, _bonuses, i, loginToken) => {
    loginToken.userGifts = _bonuses;
    localStorage.setItem("loginToken", JSON.stringify(loginToken));
  };
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
  useEffect(() => {
    if (gCount > 0) {
      $("#playbip").trigger("click");
    }
  }, [gCount]);
  useEffect(() => {
    setTimeout(() => {
      handleConfirmTest(0, _bonuses, 0, loginToken);
      ChangeGift();
    }, 4000);
  }, []);
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
          <RisingPitch />
          <RisingPitchReward />
          {stateMode == 0 && (
            <span style={{ top: -2, position: "relative" }}>
              <LevelIcon
                level={loginToken.level}
                text=""
                mode="levels"
                classinside={levelClassInside(loginToken.level)}
                number=""
                width="30px"
                onClick={() => {
                  prop.openPanel(".levels", "#lvl" + loginToken.level);
                }}
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
              width="30px"
              onClick={() => {
                prop.openPanel(".gpass", "#lvl" + loginToken.glevel);
              }}
            />
          )}
          {stateMode == 1 && _event == "VIP" && (
            <LevelIcon
              classinside="iconinside0"
              number=""
              text=""
              width="30px"
              level={1}
              mode="vip"
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
            hideOnScroll
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
