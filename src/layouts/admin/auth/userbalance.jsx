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
  Statistic,
} from "semantic-ui-react";
import DepositArea from "../forms/index";
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
const Balance = (prop) => {
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
        <Header as="h5" className="farsi text-center">
          مدت حضور در گلکسی: بیش از{" "}
          <Moment fromNow ago>
            {loginToken.createDate}
          </Moment>
        </Header>

        <Segment className="myaccount" inverted style={{ color: "#fff" }}>
          <Grid columns={3} centered>
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
                <LevelIcon
                  mode="gpass"
                  level={loginToken.glevel}
                  classinside="iconinside0"
                  number={loginToken.glevel}
                  text={"Level " + loginToken.glevel}
                  width="50px"
                />
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
                <LevelIcon
                  classinside="iconinside0"
                  number=""
                  text="VIP Table"
                  width="50px"
                  level={1}
                  mode="vip"
                />

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
        </Segment>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
