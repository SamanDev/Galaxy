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
import {
  doCurrency,
  levelLeagueReward,
  levelLeagueList,
  levelDataInfo,
} from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import LeagueResult from "./LeagueResult";
const LevelList = () => {
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <div className="inline animated ">
              <GalaxyIcon
                mode="league"
                level=""
                text="Daily League"
                classinside="iconinside0"
                number="1"
                width="60px"
                amin="inline animated swing fast"
                iconamin="swing inline animated"
              />
            </div>
            <AddCalendar
              start="24"
              dur="8"
              repeat="MONTHLY"
              format="0000"
              title="GalaxyLeague"
            />
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className="rtl text-center">
            <GiftsDesc
              desc={
                <>
                  لیگ گلکسی هر روز از{" "}
                  <span className="farsi text-gold">
                    بیست و چهارم تا پایان هر ماه میلادی
                  </span>{" "}
                  برگزار می شود.
                </>
              }
              desc2={
                <>
                  جوایز در پایان هر روز به{" "}
                  <span className="farsi text-gold">
                    {levelLeagueList.length} نفری
                  </span>{" "}
                  که بیشترین امتیاز را در طول هر روز از گلکسی کسب کرده اند, اهدا
                  خواهد شد.
                </>
              }
              desc3={
                <>
                  برای شرکت در لیگ گلکسی یا باید{" "}
                  <span className="farsi text-gold">
                    لول شما {levelDataInfo[2].minLevel} یا بالاتر
                  </span>{" "}
                  باشد یا موجودی اکانت شما بیش از{" "}
                  <span className="farsi text-gold">
                    {doCurrency(levelDataInfo[2].minBalance)} تومان
                  </span>{" "}
                  باشد.
                </>
              }
              desc4={
                <>
                  توجه داشته باشید اگر لِوِل شما{" "}
                  <span className="farsi text-gold">
                    کمتر از {levelDataInfo[2].minLevel}
                  </span>{" "}
                  باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت{" "}
                  <span className="farsi text-gold">
                    {levelDataInfo[2].banOutHours} ساعت
                  </span>{" "}
                  بسته خواهد شد.
                </>
              }
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
