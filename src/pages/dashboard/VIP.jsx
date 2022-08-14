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
import { doCurrency, levelPassReward, levelDataInfo } from "../../const";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/GalaxyIcon";
import GiftsDesc from "../../utils/GiftsDesc";
import VIPResult from "./VIPResult";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <GalaxyIcon
              mode="vip"
              level=""
              text="VIP Gift"
              className="avatar"
              style={{
                width: 50,
                margin: "auto",
                transform: "scale(1.5)",
                direction: "ltr",
              }}
            />
            <AddCalendar start="16" dur="8" format="0000" title="VIP 25/50K" />
            <GiftsDesc
              desc={
                <>
                  میز وی آی پی 25/50K از{" "}
                  <span className="farsi text-gold">
                    شانزدهم تا بیست و سوم هر ماه میلادی
                  </span>{" "}
                  برگزار می شود.
                </>
              }
              desc2={
                <>
                  هر بازیکن با{" "}
                  <span className="farsi text-gold">هر ساعت بازی</span> روی
                  میزهای{" "}
                  <span className="farsi text-gold">25K/50K و بالاتر </span>{" "}
                  مبلغ <span className="farsi text-gold">1,000,000 تومان</span>{" "}
                  دریافت می نماید.
                </>
              }
              desc3={
                <>
                  برای شرکت در VIP 25/50K یا باید{" "}
                  <span className="farsi text-gold">
                    لول شما {levelDataInfo[1].minLevel} یا بالاتر
                  </span>{" "}
                  باشد یا موجودی اکانت شما بیش از{" "}
                  <span className="farsi text-gold">
                    {doCurrency(levelDataInfo[1].minBalance)} تومان
                  </span>{" "}
                  باشد.
                </>
              }
              desc4={
                <>
                  توجه داشته باشید اگر لِوِل شما{" "}
                  <span className="farsi text-gold">
                    کمتر از {levelDataInfo[1].minLevel}
                  </span>{" "}
                  باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت{" "}
                  <span className="farsi text-gold">
                    {levelDataInfo[1].banOutHours} ساعت
                  </span>{" "}
                  بسته خواهد شد.
                </>
              }
              amount="192000000"
              subtitle="تومان برای هر بازیکن"
            />
          </List.Content>
        </List.Item>
        <VIPResult />
      </List>
    </span>
  );
};

export default LevelList;
