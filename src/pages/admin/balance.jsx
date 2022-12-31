import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Divider,
} from "semantic-ui-react";

import LevelIcon from "../../utils/svg";

import { doCurrency, levelData, getEvent, levelClassInside } from "../../const";
const Balance = (prop) => {
  var lvlPercent = 0;
  var gLvlPercent = 0;
  const loginToken = prop.user;
  const [color, setColor] = useState("grey");
  const [stateMode, setStateMode] = useState(0);
  var _event = getEvent();
  if (loginToken.accessToken) {
    if (loginToken.level == 0) {
      loginToken.level = 1;
    }
    var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);
    lvlPercent = parseFloat((loginToken.levelPoint * 100) / _lvlFinal[0].point);
    gLvlPercent = parseFloat((loginToken.glevelSecond * 100) / (5 * 60 * 60));
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
          color="grey"
          style={{
            margin: 0,
            padding: 10,
            color: "#fff",
            float: "right",
            width: 300,
          }}
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
