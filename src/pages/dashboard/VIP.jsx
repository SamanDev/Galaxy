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
              text="Vip Gift"
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
                "میز وی آی پی 25/50K از شانزدهم تا بیست و سوم هر ماه میلادی طی یک هفته برگزار می شود."
              }
              desc2={
                " هر بازیکن با هر ساعت بازی روی میزهای 25/50K و بالاتر 1,000,000 تومان هدیه دریافت می نماید."
              }
              desc3="برای شرکت در VIP 25/50K یا باید لول شما  25 یا بالاتر باشد. یا موجودی اکانت شما بیش از 10,000,000 تومان  باشد."
              desc4="توجه داشته باشید اگر لِوِل شما کمتر از 25 باشد با هر دریافت بونوس، برداشت و انتقال شما به مدت 48 ساعت بسته خواهد شد."
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
