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
  levelClass,
} from "../../const";
import LevelIcon from "../../utils/LevelIcon";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        {Array.apply(0, Array(90)).map(function (x, i) {
          totalReward += levelReward(i);
          return (
            <List.Item key={i} id={"lvl" + (i + 1)}>
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
              <LevelIcon level={i + 1} text={"Level " + (i + 1)} />
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
