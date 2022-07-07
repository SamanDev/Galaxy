import React from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
  Segment,
} from "semantic-ui-react";
import { doCurrency, levelLeagueReward, levelLeagueList } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import GiftsDesc from "../../utils/GiftsDesc";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <GiftsDesc
              desc={"لیگ هفتگی از شنبه تا جمعه شب هر هفته برگزار می شود."}
              desc2={
                "برای " +
                levelLeagueList.length +
                " نفری که بیشترین امتیاز را در طول یک هفته از گلکسی کسب کرده اند."
              }
              amount="45000000"
              subtitle="تومان هر هفته"
            />
          </List.Content>
        </List.Item>
        {Array.apply(0, Array(levelLeagueList.length)).map(function (x, i) {
          totalReward += levelLeagueReward(i);
          return (
            <List.Item key={i} id={"lvl" + (i + 1)}>
              <List.Content floated="right" className="rtl">
                <span className="text-gold">
                  {doCurrency(levelLeagueReward(i))}{" "}
                </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  <span className="text-gold">{doCurrency(totalReward)} </span>
                  <small className="farsi">امتیاز هفتگی</small>
                </div>
              </List.Content>
              <LevelIcon
                icon="fas fa-medal big star noNext"
                level={i + 1}
                text={"Hangover"}
              />
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
