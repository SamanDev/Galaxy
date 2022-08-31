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
  levelPassReward,
  levelPassList,
  levelDataInfo,
} from "../../const";
import LevelIcon from "../../utils/svg";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svg";
import GiftsDesc from "../../utils/GiftsDesc";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center ">
            <div className="inline animated ">
              <GalaxyIcon
                mode="gpass"
                level=""
                text="GalaxyPass"
                classinside="iconinside0"
                number=""
                width="60px"
                iconamin={"inline animated charkhesh delay-1s big"}
                amin={"inline animated pulse"}
              />
            </div>
            <AddCalendar
              start="1"
              dur="15"
              repeat="MONTHLY"
              format="0000"
              title="GallaxyPass"
            />
            <GiftsDesc
              desc={
                <>
                  گلکسی پَس از{" "}
                  <span className="farsi text-gold">
                    اول تا پانزدهم هر ماه میلادی
                  </span>{" "}
                  برگزار می شود.
                </>
              }
              desc2={
                <>
                  هر بازیکن با{" "}
                  <span className="farsi text-gold">5 ساعت بازی</span> روی
                  میزهای{" "}
                  <span className="farsi text-gold">
                    25K/50K و بالاتر طی مدت 24 ساعت
                  </span>{" "}
                  جایزه آن روز را دریافت می نماید و به مرحله بعدی خواهد رفت.
                </>
              }
              desc3={
                "در بامداد هر شب، گلکسی پَس ریست خواهد شد و مرحله جدید برای بازیکنانی که مرحله قبل را تمام کرده اند شروع به کار خواهد کرد و بازیکنانی که مرحله قبل را تمام نکرده اند مجددا 24 ساعت زمان دارند تا این مرحله را تمام کنند."
              }
              desc4={
                <>
                  برای شرکت در گلکسی پَس یا باید{" "}
                  <span className="farsi text-gold">
                    لول شما {levelDataInfo[0].minLevel} یا بالاتر
                  </span>{" "}
                  باشد یا موجودی اکانت شما بیش از{" "}
                  <span className="farsi text-gold">
                    {doCurrency(levelDataInfo[0].minBalance)} تومان
                  </span>{" "}
                  باشد.
                </>
              }
              desc5={
                <>
                  توجه داشته باشید اگر لِوِل شما{" "}
                  <span className="farsi text-gold">
                    کمتر از {levelDataInfo[0].minLevel}
                  </span>{" "}
                  باشد،با دریافت هر پاداش، برداشت و انتقال شما به مدت{" "}
                  <span className="farsi text-gold">
                    {levelDataInfo[0].banOutHours} ساعت
                  </span>{" "}
                  بسته خواهد شد.
                </>
              }
              amount="110000000"
              subtitle="تومان برای هر بازیکن"
            />
          </List.Content>
        </List.Item>

        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">لیست جوایز گلکسی پَس</span>
          </li>
        </ul>
        {Array.apply(0, Array(levelPassList.length)).map(function (x, i) {
          totalReward += levelPassReward(i);
          return (
            <List.Item key={i} id={"lvl" + (i + 1)}>
              <List.Content floated="right" className="rtl">
                <span className="text-gold">
                  {doCurrency(levelPassReward(i))}{" "}
                </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  {doCurrency(totalReward)}{" "}
                  <small className="farsi mysmall">مجموع پاداش</small>
                </div>
              </List.Content>
              <LevelIcon
                mode="gpass"
                level={i + 1}
                text={"Level " + (i + 1)}
                classinside="iconinside0"
                number=""
                width="38px"
              />
            </List.Item>
          );
        })}
        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
      </List>
    </span>
  );
};

export default LevelList;
