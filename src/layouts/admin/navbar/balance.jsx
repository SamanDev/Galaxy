import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Divider,
} from "semantic-ui-react";
import DepositArea from "../depositComponent/index.jsx";
import CashoutArea from "../cashout/index.jsx";
import LevelIcon from "../../../utils/LevelIcon";

import BonusArea from "../bonus/index.jsx";
import { doCurrency, levelData, getEvent } from "../../../const";
const Balance = (prop) => {
  var lvlPercent = 0;
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [color, setColor] = useState("grey");
  const [stateMode, setStateMode] = useState(0);
  var _event = getEvent();
  if (loginToken) {
    var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);
    lvlPercent = parseFloat((loginToken.levelPoint * 100) / _lvlFinal[0].point);
  }
  const [lvlPercentState, setlvlPercentState] = useState(lvlPercent);
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
  }, []);
  useEffect(() => {
    setlvlPercentState(stateMode * 50);
  }, [stateMode]);
  if (loginToken) {
    return (
      <>
        <Segment
          className="myaccount"
          inverted
          style={{ margin: 0, padding: 10, color: "#fff" }}
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
              level={15}
              style={{
                position: "relative",
                textAlign: "center",
                top: -3,
              }}
              onClick={() => {
                prop.openPanel(".gpass", "#lvl1");
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
            <DepositArea compmode="deposit" {...prop} />
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
            <DepositArea compmode="cashout" {...prop} />
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
              <Icon circular size="small" color={color} name="gift" link />
            }
          >
            <BonusArea {...prop} setColor={setColor} />
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
