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
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        {Array.apply(0, Array(90)).map(function (x, i) {
          totalReward += levelReward(i);
          arra.push({
            level: i + 1,
            reward: levelReward(i),
            commission: levelRewardPercent(i),
            percent: levelPercent(i),
            point: parseInt((levelReward(i) * 100) / levelPercent(i)),
          });
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
                <span className="text-gold">{doCurrency(levelReward(i))} </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  <span className="text-gold">{levelRewardPercent(i)}% </span>
                  <small className="farsi">کمیسیون</small>
                  <div>
                    {doCurrency(totalReward)}{" "}
                    <small className="farsi mysmall">مجموع پاداش</small>
                  </div>
                </div>
              </List.Content>
              <LevelIcon
                level={i + 1}
                mode="levels"
                text={"Level " + (i + 1)}
                classinside={levelClassInside(i)}
                number={i + 1}
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
