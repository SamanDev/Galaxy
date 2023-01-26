import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Divider,
  Header,
  Grid,
  List,
  Image,
  Statistic,
  Accordion,
} from "semantic-ui-react";
import DepositArea from "../forms/index";
import Reward from "../../../utils/Reward";
import Moment from "react-moment";
import LevelIcon from "../../../utils/svg";
import { convertDateToJalali } from "../../../utils/convertDate";
import $ from "jquery";
//import BonusArea from "../../../pages/dashboard/ActiveTableJson";
import {
  doCurrency,
  levelData,
  getEvent,
  levelClassInside,
  levelDataInfo,
} from "../../../const";

const moment = require("moment");
const printtotal = (data, mode, target) => {
  return (
    <span
      className={gettotal(data, mode, "count") == 0 ? "opacity-25" : ""}
      style={{ fontSize: "70%" }}
    >
      <br />
      <br />
      <div className="farsi text-center">
        <span className="text-gold">
          {doCurrency(gettotal(data, mode, target))} تومان
        </span>
        <br />
        پاداش
      </div>
      <br />
    </span>
  );
};

const printtotalrow = (data, mode, target) => {
  return (
    <>
      <div className="farsi text-right">
        <span className="text-gold">
          {doCurrency(gettotal(data, mode, target))} تومان
        </span>{" "}
        پاداش در {doCurrency(gettotal(data, mode, "count"))} رکورد
      </div>
    </>
  );
};
const gettotal = (data, mode, target) => {
  var _data = data.filter((d) => d.mode === mode);
  var _totalReward = 0;
  {
    _data.map((x, i) => {
      _totalReward = _totalReward + x.amount;
    });
  }
  if (target == "total") return _totalReward;
  if (target == "count") return _data.length;
};
const printreward = (data, mode) => {
  var _data = data.filter((d) => d.mode === mode);
  return (
    <div
      style={{
        paddingLeft: 15,
        marginRight: 10,
        position: "relative",
        top: -13,
        background: "rgba(0,0,0,.2)",
      }}
      className="animated fadeInDown"
    >
      {_data.map((x, i) => {
        return (
          <div className={"rewardname"} mode={x.mode} key={i}>
            <Reward item={x} color={true} />
          </div>
        );
      })}
    </div>
  );
};
const Balance = (prop) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const printtotalrowBox = (index, loginToken, mode, title) => {
    if (
      gettotal(loginToken.userGifts, mode.replace("gifts", "gift"), "count") ==
      0
    )
      return false;
    var _lvl = 1;
    if (mode == "levels") {
      _lvl = loginToken.level;
    }
    if (mode == "gpass") {
      _lvl = loginToken.glevel;
    }
    return (
      <>
        <Accordion.Title
          index={index}
          onClick={handleClick}
          active={activeIndex === index}
        >
          <List.Content className="lh-lg p-2">
            <div
              className={
                gettotal(
                  loginToken.userGifts,
                  mode.replace("gifts", "gift"),
                  "count"
                ) == 0
                  ? "opacity-25 pull-left"
                  : "pull-left"
              }
            >
              <LevelIcon
                level={_lvl}
                text={""}
                mode={mode.replace("gifts", "gift3")}
                classinside={levelClassInside(loginToken.level)}
                number=""
                width="40px"
              />
            </div>

            <List.Header as="div" className="farsi text-end" color="grey">
              {title}
            </List.Header>
            <List.Description
              className={
                gettotal(
                  loginToken.userGifts,
                  mode.replace("gifts", "gift"),
                  "count"
                ) == 0
                  ? "opacity-25 fw-lighter"
                  : "fw-lighter"
              }
            >
              {printtotalrow(
                loginToken.userGifts,
                mode.replace("gifts", "gift"),
                "total"
              )}
            </List.Description>
          </List.Content>

          <Divider inverted fitted />
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === index}
          className="fadeoutend"
        >
          {printreward(loginToken.userGifts, mode.replace("gifts", "gift"))}
        </Accordion.Content>
      </>
    );
  };
  var lvlPercent = 0;
  var gLvlPercent = 0;
  var vLvlPercent = 0;
  const loginToken = prop.data;

  if (loginToken) {
    if (loginToken.level == 0) {
      loginToken.level = 1;
    }
    var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);

    lvlPercent = parseFloat(
      (loginToken.levelPoint * 100) / _lvlFinal[0].point
    ).toFixed(2);
    gLvlPercent = parseFloat(
      (loginToken.glevelSecond * 100) / (levelDataInfo[0].hoursLimit * 3600)
    ).toFixed(2);
    vLvlPercent = parseFloat(
      (loginToken.vipPlaySecond * 100) / (levelDataInfo[1].hoursLimit * 3600)
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

  const [lvlPercentState, setlvlPercentState] = useState(lvlPercent);
  const [glvlPercentState, setglvlPercentState] = useState(gLvlPercent);
  const [vlvlPercentState, setvlvlPercentState] = useState(vLvlPercent);

  if (loginToken && !prop.loadingLogin) {
    var _totalReward = 0;
    {
      loginToken.userGifts.map((x, i) => {
        _totalReward = _totalReward + x.amount;
      });
    }
    return (
      <>
        <Header as="h1" className="text-center">
          <span className="text-gold">{loginToken.username}</span> Profile
        </Header>
        <p
          className="farsi text-center fw-lighter"
          style={{ color: "#949494", fontSize: 12 }}
        >
          مدت حضور در گلکسی: بیش از{" "}
          <Moment fromNow ago>
            {loginToken.createDate}
          </Moment>
        </p>

        <Header
          as="h3"
          className="farsi text-center"
          style={{
            lineHeight: "180%",
          }}
        >
          مجموع پاداش ها
          <br />
          <span className="text-gold">{doCurrency(_totalReward)} تومان</span>
        </Header>

        <Grid columns={3} centered divided>
          <Grid.Row>
            <Grid.Column className="text-center">
              <LevelIcon
                level={loginToken.level}
                text={"Level " + loginToken.level}
                mode="levels"
                classinside={levelClassInside(loginToken.level)}
                number=""
                width="50px"
              />

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
            </Grid.Column>
            <Grid.Column className="text-center">
              <span
                className={
                  gettotal(loginToken.userGifts, "gpass", "count") == 0
                    ? "opacity-25"
                    : ""
                }
              >
                <LevelIcon
                  mode="gpass"
                  level={loginToken.glevel}
                  classinside="iconinside0"
                  number={loginToken.glevel}
                  text={"Level " + loginToken.glevel}
                  width="50px"
                />
              </span>
              <Popup
                trigger={
                  <Progress
                    percent={glvlPercentState}
                    inverted
                    indicating
                    size="tiny"
                    className="myprogress"
                  />
                }
                size="mini"
                inverted
                content={"%" + glvlPercentState}
                position="bottom center"
              />
            </Grid.Column>

            <Grid.Column className="text-center">
              <span
                className={
                  gettotal(loginToken.userGifts, "vip", "count") == 0
                    ? "opacity-25"
                    : ""
                }
              >
                <LevelIcon
                  classinside="iconinside0"
                  number=""
                  text="VIP Table"
                  width="50px"
                  level={1}
                  mode="vip"
                />
              </span>

              <Popup
                trigger={
                  <Progress
                    percent={vlvlPercentState}
                    inverted
                    indicating
                    size="tiny"
                    className="myprogress"
                  />
                }
                size="mini"
                inverted
                content={"%" + vlvlPercentState}
                position="bottom center"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Accordion inverted>
          {printtotalrowBox(1, loginToken, "levels", "پاداش لِوِل ها")}
          {printtotalrowBox(2, loginToken, "gpass", "گلکسی پَس")}
          {printtotalrowBox(3, loginToken, "vip", "VIP Table")}
          {printtotalrowBox(4, loginToken, "league", "لیگ روزانه")}
          {printtotalrowBox(
            5,
            loginToken,
            "commission",
            "کمیسیون معرفی دوستان"
          )}
          {printtotalrowBox(6, loginToken, "rakeback", "ریک بک پوکر")}
          {printtotalrowBox(7, loginToken, "gifts", "هدایای گلکسی")}
          {printtotalrowBox(8, loginToken, "tournament", "تورنومنت ها")}
        </Accordion>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
