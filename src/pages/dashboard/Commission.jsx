import React from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
  Header,
} from "semantic-ui-react";
import $ from "jquery";
import { doCurrency, levelPassReward, levelPassList } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svg";
import GiftsDesc from "../../utils/GiftsDesc";
import Report from "./Report";
const LevelList = (prop) => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <div className="inline animated ">
              {prop.mode == "commission" ? (
                <GalaxyIcon
                  mode="commission"
                  level=""
                  text="Commission"
                  classinside="iconinside0"
                  number="1"
                  width="60px"
                  amin="inline animated slideInDown fast"
                  iconamin="swing"
                />
              ) : (
                <GalaxyIcon
                  mode="rakeback"
                  level=""
                  text="Rakeback"
                  classinside="iconinside0"
                  number="1"
                  width="60px"
                  amin="inline animated heartBeat"
                  iconamin="swing"
                />
              )}
            </div>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content className="rtl text-center">
            {prop.mode == "commission" ? (
              <>
                <GiftsDesc
                  desc={
                    <>
                      کمیسیون معرفی دوستان هر شب{" "}
                      <span className="farsi text-gold">ساعت 22</span> برای هر
                      بازیکن فعال شده و تا{" "}
                      <span className="farsi text-gold">24 ساعت</span> قابل
                      دریافت می باشد.
                    </>
                  }
                  desc2={
                    <>
                      درصد کمیسیون با توجه به لِوِل شما متغیر خواهد بود.{" "}
                      <span
                        className="farsi text-gold"
                        style={{ cursor: "pointer" }}
                        onClick={() => $("#openlevellist").trigger("click")}
                      >
                        اطلاعات بیشتر
                      </span>
                    </>
                  }
                  desc3={
                    <>
                      درصورت دریافت از{" "}
                      <span className="farsi text-gold">ساعت 22 تا 24</span> هر
                      شب، <span className="farsi text-gold">5%</span> به مبلغ آن
                      اضافه خواهد شد.
                    </>
                  }
                  desc4="توجه داشته باشید درصورت عدم دریافت تا ساعت 22 شب بعد (24 ساعت)، کمیسیون شما منقضی شده و قابل دریافت نمی باشد."
                  title="از 10% تا 50%"
                  subtitle="کمیسیون معرفی دوستان"
                />
              </>
            ) : (
              <>
                <GiftsDesc
                  desc={
                    <>
                      ریک بک پوکر هر شب{" "}
                      <span className="farsi text-gold">ساعت 22</span> برای هر
                      بازیکن فعال شده و تا{" "}
                      <span className="farsi text-gold">24 ساعت</span> قابل
                      دریافت می باشد.
                    </>
                  }
                  desc2={
                    <>
                      درصورت دریافت از{" "}
                      <span className="farsi text-gold">ساعت 22 تا 24</span> هر
                      شب، <span className="farsi text-gold">10%</span> به مبلغ
                      آن اضافه خواهد شد.
                    </>
                  }
                  desc3="توجه داشته باشید درصورت عدم دریافت تا ساعت 22 شب بعد (24 ساعت)، ریک بک شما منقضی شده و قابل دریافت نمی باشد."
                  amount="10%"
                  subtitle="ریک بک پوکر"
                />
              </>
            )}
          </List.Content>
        </List.Item>
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem"></li>
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
        <Report />
      </List>
    </span>
  );
};

export default LevelList;
