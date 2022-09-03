import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import { doCurrency, levelDataInfo } from "../../const";
import $ from "jquery";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/partymenu";
import Moment from "react-moment";

const moment = require("moment");
const LevelList = () => {
  var _day = moment().day(5);
  var nowDay = moment(_day).date();
  var start = moment(_day).format("YYYYMMDDT200000");

  var end = moment().format("YYYYMMDDTHHmmss");

  return (
    <span className="myaccount popupmenu">
      <ConfettiArea recycle={false} numberOfPieces="50" />
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <div>
              <GalaxyIcon
                mode="gifts"
                level="1"
                text="Galaxy Gifts"
                classinside="iconinside0"
                number="1"
                width="60px"
                amin="inline animated swing fast"
                iconamin="swing inline animated"
              />
            </div>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className="rtl text-center">
            <GiftsDesc
              desc={
                <>
                  تورنومنت گلکسی هر{" "}
                  <span className="farsi text-gold">جمعه ساعت 22:00</span> با{" "}
                  <span className="farsi text-gold">
                    ورودی رایگان برای لِوِل دار ها
                  </span>{" "}
                  برگزار می شود.
                </>
              }
              desc2={
                <>
                  برای شرکت در تورنومنت گلکسی یا باید{" "}
                  <span className="farsi text-gold">
                    لول شما {levelDataInfo[3].minLevel} یا بالاتر
                  </span>{" "}
                  باشد یا موجودی اکانت شما بیش از{" "}
                  <span className="farsi text-gold">
                    {doCurrency(levelDataInfo[3].minBalance)} تومان
                  </span>{" "}
                  باشد.
                </>
              }
              desc3={
                <>
                  توجه داشته باشید اگر لِوِل شما{" "}
                  <span className="farsi text-gold">
                    کمتر از {levelDataInfo[3].minLevel}
                  </span>{" "}
                  باشد، بس از ثبت نام، برداشت و انتقال شما به مدت{" "}
                  <span className="farsi text-gold">
                    {levelDataInfo[3].banOutHours} ساعت
                  </span>{" "}
                  بسته خواهد شد.
                </>
              }
              desc4={
                <>
                  ثبت نام{" "}
                  <span className="farsi text-gold">
                    ۲ ساعت قبل از شروع تورنومنت
                  </span>{" "}
                  باز خواهد شد.
                </>
              }
              amount="60000000"
              subtitle={
                <>
                  تومان برای ۳۰ نفر برتر
                  <br />و معرف های آنها
                </>
              }
            />
            {start > end ? (
              <>
                <Button
                  fluid
                  style={{ margin: "10px 0" }}
                  className="farsi lh-lg"
                  color="grey"
                  icon
                  inverted
                  disabled
                >
                  <Icon
                    name="clock outline"
                    size="huge"
                    color="grey"
                    inverted
                  />

                  <div style={{ marginTop: 10 }}>
                    <Moment fromNow>{start}</Moment> تا{" "}
                  </div>
                  <div className="h4">شروع ثبت نام</div>
                </Button>
                <AddCalendar
                  start={nowDay}
                  dur="0"
                  repeat="WEEKLY"
                  format="2200"
                  title="تورنومنت گلکسی"
                />
              </>
            ) : (
              <Button
                fluid
                style={{ margin: "10px 0" }}
                className="farsi lh-lg"
                color="red"
                icon
              >
                <Icon
                  name="calendar plus outline"
                  size="huge"
                  color="grey"
                  inverted
                />
                <div style={{ marginTop: 10 }}> ثبت نام در</div>

                <div className="h4">تورنومنت</div>
              </Button>
            )}

            <GiftsDesc
              desc={
                <div className="text-center">
                  ۳۰ جایزه{" "}
                  <div className="farsi-inline text-gold h5">یک میلیونی</div>{" "}
                  برای ۳۰ نفر پایانی تورنومنت
                </div>
              }
              desc2={
                <div className="text-center">
                  فقط کافیست جزو ۳۰ نفر پایانی باشید تا برنده یک میلیونی باشید.
                </div>
              }
              desc3={
                <div className="text-center">
                  ۳۰ جایزه{" "}
                  <div className="farsi-inline text-gold h5">یک میلیونی</div>{" "}
                  برای معرف های ۳۰ نفر پایانی تورنومنت
                </div>
              }
              desc4={
                <div className="text-center">
                  با معرفی دوستان خود شانس برد خود را چند برابر کنید.
                  <br />
                  فقط کافیست آنها جزو ۳۰ نفر پایانی باشند تا شما برنده یک
                  میلیونی باشید.
                </div>
              }
              title="۳۰+۳۰ میلیونی"
              subtitle="یعنی چی؟"
            />
            <Button
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              color="orange"
              onClick={() => $("#openinvite").trigger("click")}
            >
              <Icon.Group size="huge">
                <Icon name="user" inverted />
                <Icon corner name="add" color="red" />
              </Icon.Group>
              <br />
              <br />
              معرفی دوستان
            </Button>
          </List.Content>
        </List.Item>
      </List>
    </span>
  );
};

export default LevelList;
