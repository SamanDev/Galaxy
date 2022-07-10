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
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/GalaxyIcon";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <GalaxyIcon
              mode="league"
              level=""
              text="League"
              style={{
                width: 32,
                margin: "auto",
                transform: "scale(1.5)",
                direction: "ltr",
              }}
            />
            <AddCalendar start="24" dur="8" format="0000" title="League" />
            <GiftsDesc
              desc={
                "لیگ گلکسی هر روز از بیست و چهارم تا پایان هر ماه میلادی  برگزار می شود."
              }
              desc2={
                "برای " +
                levelLeagueList.length +
                " نفری که بیشترین امتیاز را در طول هر روز از گلکسی کسب کرده اند."
              }
              amount="45000000"
              subtitle="تومان هر روز"
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
