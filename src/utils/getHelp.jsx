import { el } from "date-fns/locale";
import { doCurrency, updateBonusLabel } from "../const";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Header,
} from "semantic-ui-react";
const moment = require("moment");

function getRemaining() {
  const now = moment();
  const end = moment().format("YYYY-MM-DD 23:59:59");
  const then = moment(end);
  const diff = then.diff(now);
  const dur = moment.duration(diff);

  let parts = [];
  for (const part of ["hours", "minutes"]) {
    const d = dur[part]();
    dur.subtract(moment.duration(d, part));
    parts.push(d);
  }
  return parts;
}

function typeHour(rem, showmin) {
  var _left = "";
  if (!showmin) {
    _left = "حدودا ";
  }
  if (rem[0] > 0) {
    _left = _left + parseInt(rem[0]) + " ساعت";
  }
  if (rem[1] > 0 && showmin) {
    _left = _left + " و " + parseInt(rem[1]) + " دقیقه";
  }

  return _left;
}
function getTotGpass(set, day, lvl) {
  var total = set[0].totalRewards;
  var totalget = 0;
  var totalgetCan = 0;
  var totalleft = 0;
  {
    set.map((x, i) => {
      if (x.level < lvl) {
        totalget += x.reward;
      }
      if (x.level < day) {
        totalgetCan += x.reward;
      }
    });
  }
  if (lvl > 1) {
    var _gpass = "";
  } else {
    var _gpass = " ";
  }

  if (totalgetCan - totalget > 0) {
    _gpass = _gpass + "";
  }
  return <></>;
}

export const getHelp = (loginToken, siteInfo, event) => {
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  viprules.totalRewards = "192000000";
  var levelData = siteInfo?.levelUps;
  const nowDate = new Date();
  const nowDay = nowDate.getDate();

  if (event == "GPass") {
    var rem = getRemaining();
    var total = siteInfo.galaxyPassSet[0].totalRewards;
    var totalget = 0;
    var totalgetCan = 0;
    var totalleft = 0;
    {
      siteInfo.galaxyPassSet.map((x, i) => {
        if (x.level < loginToken.glevel) {
          totalget += x.reward;
        }
        if (
          x.level >= loginToken.glevel &&
          x.level <=
            loginToken.glevel + siteInfo.galaxyPassSet[0].endDay - nowDay
        ) {
          totalleft += x.reward;
        }
        if (x.level < nowDay) {
          totalgetCan += x.reward;
        }
      });
    }
    var passSec = gpassrules.hoursLimit * 3600 - loginToken.glevelSecond;
    var gLvlLeft = [
      new Date(passSec * 1000).toISOString().substring(11, 13),
      new Date(passSec * 1000).toISOString().substring(14, 16),
    ];

    return (
      <>
        <Header
          as="h4"
          inverted
          color="yellow"
          className="farsi"
          style={{ padding: 10, margin: 0 }}
        >
          گلکسی پَس
        </Header>
        <p className="farsi">
          <span className="text-warning">{typeHour(rem, false)} مانده</span> تا
          پایان <span className="text-warning">مرحله {nowDay}</span> گلکسی پَس
          با <span className="text-warning"> {doCurrency(total)} تومان</span>{" "}
          پاداش.
        </p>
        {loginToken.glevel <= nowDay && (
          <p className="farsi text-secondary">
            هم اکنون شما در{" "}
            <span className="text-warning">
              مرحله {loginToken.glevel} گلکسی پَس
            </span>{" "}
            هستید و تا الان{" "}
            {loginToken.glevel > 1 ? (
              <>
                <span className="text-success fw-bold">
                  مبلغ {doCurrency(totalget)} تومان
                </span>{" "}
                دریافت کرده اید
              </>
            ) : (
              <>هیچ پاداشی دریافت نکرده اید</>
            )}{" "}
            {loginToken.glevel < nowDay && (
              <>
                که البته در {nowDay - 1} روز اخیر می توانستید{" "}
                <span className="text-danger fw-bold">
                  مبلغ {doCurrency(totalgetCan)} تومان
                </span>{" "}
                دریافت کرده باشید.
              </>
            )}
          </p>
        )}
        <p className="farsi  text-secondary">
          برای دریافت پاداش{" "}
          <span className="text-warning">
            مرحله {loginToken.glevel} گلکسی پَس
          </span>{" "}
          باید <span className="text-warning">{typeHour(gLvlLeft, true)}</span>{" "}
          روی میزهای گلکسی بازی کنید. با بازی همرمان روی چند میز می توانید این
          زمان را کوتاه تر نمایید.
        </p>
        {loginToken.glevel < nowDay && (
          <p className="farsi">
            با توجه به {siteInfo.galaxyPassSet[0].endDay - nowDay} روز زمان
            باقیمانده از گلکسی پَس، شما می توانید تا مرحله{" "}
            {loginToken.glevel + siteInfo.galaxyPassSet[0].endDay - nowDay}{" "}
            پیشروی کرده و
            <span className="text-success-emphasis">
              {" "}
              مبلغ {doCurrency(totalleft)} تومان
            </span>{" "}
            دیگر پاداش دریافت کنید.
          </p>
        )}
      </>
    );
  }
};