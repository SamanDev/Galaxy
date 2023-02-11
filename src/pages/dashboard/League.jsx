import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import {
  doCurrency,
  levelLeagueReward,
  levelLeagueList,
  levelDataInfo,
} from "../../const";
import LevelIcon from "../../utils/svg";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import { getReportPenService } from "../../services/report";
import LastRewardList from "./LastRewardList";
const LevelList = (prop) => {
  var totalReward = 0;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getReportPenService("getDailyLeague");
      if (res.status === 200) {
        setData(
          res.data.sort((a, b) => (a.dailyPoint < b.dailyPoint ? 1 : -1))
        );
        setLoading(false);
        prop.bindLastReward();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetRewards();
  }, []);
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
        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">لیست جوایز لیگ گلکسی</span>
          </li>
        </ul>
        {Array.apply(0, Array(levelLeagueList.length)).map(function (x, i) {
          totalReward += levelLeagueReward(i);
          var _lvl = i + 1;
          var _text = "Place " + (i + 1);
          var _label = "مجموع جوایز";
          if (data[i]) {
            _text = data[i].username;
            _lvl = 30;
            totalReward = data[i].dailyPoint;
          }
          return (
            <List.Item
              key={i}
              id={"lvl" + (i + 1)}
              className={"rewardname"}
              mode="leauge"
            >
              <List.Content floated="right" className="rtl">
                <span className="text-gold">
                  {doCurrency(levelLeagueReward(i))}{" "}
                </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  {doCurrency(totalReward)}{" "}
                  <small className="farsi mysmall">امتیاز امروز</small>
                </div>
              </List.Content>
              <span style={{ float: "left" }}>
                <LevelIcon
                  mode="league"
                  level={i + 1}
                  text={_text}
                  classinside="iconinside0"
                  number=""
                  width="36px"
                  iconamin="swing"
                />
              </span>
              <div
                style={{
                  position: "relative",
                  left: -50,
                  transform: "scale(.8)",
                }}
              ></div>
            </List.Item>
          );
        })}
      </List>
      <LastRewardList mode="league" {...prop} />
    </span>
  );
};

export default LevelList;
