import React from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import {
  doCurrency,
  levelList,
  levelReward,
  levelRewardPercent,
  levelPercent,
  levelClassInside,
} from "../../const";
import LevelIcon from "../../utils/svg";

import LevelBar from "../../utils/LevelBar";

const LevelList = () => {
  var totalReward = 0;
  var arra = [];
  const siteInfo = JSON.parse(localStorage.getItem("siteInfo"));
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  siteInfo?.levelUps?.sort((a, b) => (a.id > b.id ? 1 : -1));
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        {siteInfo.levelUps.map((x, i) => {
          totalReward += x.reward;

          return (
            <List.Item
              key={i}
              id={"lvl" + (i + 1)}
              className={
                loginToken?.level == i + 1
                  ? "active animated fadeIn faster"
                  : " animated fadeIn faster"
              }
            >
              <List.Content floated="right" className="rtl">
                <span className="text-gold">{doCurrency(x.reward)} </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  <span className="text-gold">{x.commission}% </span>
                  <small className="farsi">کمیسیون</small>
                  <div>
                    {doCurrency(totalReward)}{" "}
                    <small className="farsi mysmall">مجموع پاداش</small>
                  </div>
                </div>
              </List.Content>
              <LevelIcon
                level={x.level}
                mode="levels"
                text={"Level " + x.level}
                classinside={levelClassInside(i)}
                number={x.level}
                width="38px"
              />

              {loginToken && (
                <div className="levelbar">
                  {loginToken.level == i + 1 ? (
                    <>
                      <LevelBar progress />
                    </>
                  ) : (
                    <>
                      {loginToken.level > i + 1 ? (
                        <>
                          <LevelBar val="100" progress />
                        </>
                      ) : (
                        <>
                          <LevelBar val="0" />
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
