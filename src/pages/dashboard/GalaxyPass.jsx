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
import { doCurrency, levelPassReward, levelPassList } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/GalaxyIcon";
import GiftsDesc from "../../utils/GiftsDesc";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <GalaxyIcon
              mode="gpass"
              level=""
              text="GPass"
              style={{
                width: 32,
                margin: "auto",
                transform: "scale(1.5)",
                direction: "ltr",
              }}
            />
            <AddCalendar start="1" dur="15" format="0000" title="GallaxyPass" />
            <GiftsDesc
              desc={"گلکسی پَس از اول تا پانزدهم هر ماه میلادی برگزار می شود."}
              desc2={
                " هر بازیکن با 5 ساعت بازی روی میزهای 15K/15K و بالاتر طی مدت 24 ساعت  جایزه آن روز را دریافت می نماید و به مرحله بعدی خواهد رفت."
              }
              desc3={
                "در ساعت 00:01 هر روز گلکسی پَس ریست خواهد شد و مرحله جدید برای بازیکنانی که مرحله قبل را تمام کرده اند شروع به کار خواهد کرد و بازیکنانی که مرحله قبل را تمام نکرده اند مجددا 24 ساعت زمان دارند تا این مرحله را تمام کنند."
              }
              desc4="برای شرکت در گلکسی پَس یا باید لول شما  7 یا بالاتر باشد. یا موجودی اکانت شما بیش از 10,000,000 تومان  باشد."
              desc5="توجه داشته باشید اگر لِوِل شما کمتر از 7 باشد، برداشت و انتقال شما به مدت 72 ساعت بسته خواهد شد."
              amount="110000000"
              subtitle="تومان برای هر بازیکن"
            />
          </List.Content>
        </List.Item>
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
                icon="fab fa-google big star"
                level={i + 1}
                text={"Level " + (i + 1)}
              />
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
