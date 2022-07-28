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
import LeagueUser from "./LeagueUser";
import LeagueResult from "./LeagueResult";
const LevelList = () => {
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
          </List.Content>
        </List.Item>
        <LeagueUser />
        <List.Item>
          <List.Content className="rtl text-center">
            <GiftsDesc
              desc={
                "لیگ گلکسی هر روز از بیست و چهارم تا پایان هر ماه میلادی  برگزار می شود."
              }
              desc2={
                "برای " +
                levelLeagueList.length +
                " نفری که بیشترین امتیاز را در طول هر روز از گلکسی کسب کرده اند."
              }
              desc3={"جوایز در پایان هر روز اهدا خواهد شد."}
              desc4="برای شرکت در لیگ گلکسی یا باید لول شما 5 یا بالاتر باشد. یا موجودی اکانت شما بیش از 10,000,000 تومان  باشد."
              desc5="توجه داشته باشید اگر لِوِل شما کمتر از 5 باشد، برداشت و انتقال شما به مدت 72 ساعت بسته خواهد شد."
              amount="45000000"
              subtitle="تومان هر روز"
            />
          </List.Content>
        </List.Item>
        <LeagueResult />
      </List>
    </span>
  );
};

export default LevelList;
