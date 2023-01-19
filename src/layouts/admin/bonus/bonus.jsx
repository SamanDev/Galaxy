import React, { useState, useEffect } from "react";
import {
  Icon,
  Item,
  Button,
  Header,
  Divider,
  Image,
  List,
} from "semantic-ui-react";
import LevelIcon from "../../../utils/svg";
import { doCurrency, levelDataInfo, levelClassInside } from "../../../const";
import { Alert } from "../../../utils/alerts";
import { MyConfirm, MyToast, MyDeposit } from "../../../utils/myAlert";
import Status from "../../../utils/Status";
import { cashierService } from "../../../services/cashier";
import Moment from "react-moment";
import bonus from "../../../pages/dashboard/ReportPen";
import $ from "jquery";
const moment = require("moment");

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};

const BonusArea = (prop) => {
  const [loading, setLoading] = useState(false);
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));

  const getReward = async (bonus) => {
    setLoading(true);
    try {
      const res = await cashierService({ id: bonus.id }, "getReward", "");
      if (res.status == 200) {
        setLoading(false);
        MyToast("انجام شد");
      } else {
      }
    } catch (error) {
      setLoading(false);
      var d = {
        accessToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb2NlIiwiaWF0IjoxNjczOTk4NjE2LCJleHAiOjE2NzQyOTg2MTZ9.xgiAnn_YekQ7kKaan-LOLi_rNnSzGqz7OwY6htgZINEcX5GQ7h8qfEqz-DeWFMJyBhH9v4VDcEivxypP_j-9HA",
        id: 1,
        refer: null,
        balance: 54000000,
        totalCommission: 0.0,
        fullName: "سالار عباسی",
        vipPlaySecond: 0,
        dailyPoint: 206873,
        levelPoint: 2000333,
        totalPoint: 206873,
        totalDeposit: 0,
        totalCashout: 0,
        level: 9,
        userBlock: false,
        userActivate: true,
        multiAccount: false,
        outOfIran: false,
        profit: 0.0,
        createDate: "2022-12-10T15:46:44.796+00:00",
        lastLogin: "2023-01-17T23:36:56.149+00:00",
        blockDateOut: "2022-12-10T15:46:44.796+00:00",
        username: "coce",
        email: "salidesign@gmail.com",
        roles: [{ id: 1, name: "ROLE_ADMIN" }],
        bankInfos: [
          {
            id: 4,
            date: "2023-01-09T15:31:31.581+00:00",
            cardNumber: "6876786786876673",
            accountNumber: "76678678678",
            shebaNumber: "767868767876786876876876",
            holderName: "سالار عباسی",
            cvv: "842",
            expiration: "01/11",
            mobile: "09126666820",
            bankName: "بانک ملت",
            active: false,
            username: "coce",
          },
        ],
        cashierGateways: [
          {
            id: 9,
            total: 0,
            bonus: 0,
            name: "BankTransfer",
            mode: "BankTransfer",
            active: true,
          },
          {
            id: 11,
            total: 0,
            bonus: 0,
            name: "Hamrahcart",
            mode: "IranShetab",
            active: true,
          },
          {
            id: 4,
            total: 0,
            bonus: 0,
            name: "CartToCart",
            mode: "CartToCart",
            active: true,
          },
          {
            id: 6,
            total: 0,
            bonus: 0,
            name: "Transfer",
            mode: "Transfer",
            active: true,
          },
          {
            id: 5,
            total: 0,
            bonus: 0,
            name: "Rakeback",
            mode: "Rakeback",
            active: true,
          },
          {
            id: 7,
            total: 0,
            bonus: 5,
            name: "Bitcoin",
            mode: "CoinPayments",
            active: true,
          },
          {
            id: 10,
            total: 0,
            bonus: 0,
            name: "Haft80",
            mode: "IranShetab",
            active: true,
          },
          {
            id: 2,
            total: 0,
            bonus: 5,
            name: "USDT",
            mode: "CoinPayments",
            active: true,
          },
          {
            id: 3,
            total: 0,
            bonus: 10,
            name: "PerfectMoney",
            mode: "PerfectMoney",
            active: true,
          },
          {
            id: 12,
            total: 0,
            bonus: 0,
            name: "Commission",
            mode: "Commission",
            active: true,
          },
          {
            id: 1,
            total: 0,
            bonus: 0,
            name: "Digipay",
            mode: "IranShetab",
            active: true,
          },
          {
            id: 8,
            total: 0,
            bonus: 2,
            name: "VisaGiftCode",
            mode: "VisaGiftCode",
            active: true,
          },
        ],
        userGifts: [
          {
            id: 46,
            date: "2023-01-14T19:39:22.107+00:00",
            startDate: "2023-01-14T19:34:00.000+00:00",
            expireDate: "2023-01-15T01:34:00.000+00:00",
            mode: "rakeback",
            label: "ریک بک",
            text: "Rakeack",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 3000000,
            userLevel: 9,
          },
          {
            id: 49,
            date: "2023-01-16T15:05:01.464+00:00",
            startDate: "2023-01-16T14:56:00.000+00:00",
            expireDate: "2023-01-16T20:56:00.000+00:00",
            mode: "gift",
            label: "هدیه",
            text: "Free Gift",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 300000,
            userLevel: 9,
          },
          {
            id: 57,
            date: "2023-01-18T19:06:52.276+00:00",
            startDate: "2023-01-18T19:02:00.000+00:00",
            expireDate: "2023-01-19T01:02:00.000+00:00",
            mode: "gift",
            label: "هدیه",
            text: "Free Gift",
            username: "coce",
            status: "Done",
            received: true,
            amount: 3000000,
            userLevel: 9,
          },
          {
            id: 44,
            date: "2023-01-14T16:55:33.925+00:00",
            startDate: "2023-01-14T16:50:00.000+00:00",
            expireDate: "2023-01-14T22:50:00.000+00:00",
            mode: "levels",
            label: "پاداش افزایش لٍوٍل",
            text: "Level 59",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 3000000,
            userLevel: 1,
          },
          {
            id: 45,
            date: "2023-01-14T19:18:16.475+00:00",
            startDate: "2023-01-14T19:16:00.000+00:00",
            expireDate: "2023-01-15T01:16:00.000+00:00",
            mode: "gpass",
            label: "پاداش گلکسی پَس",
            text: "Level 15",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 3000000,
            userLevel: 14,
          },
          {
            id: 48,
            date: "2023-01-15T00:13:28.314+00:00",
            startDate: "2023-01-15T00:13:00.000+00:00",
            expireDate: "2023-01-15T06:13:00.000+00:00",
            mode: "gpass",
            label: "پاداش گلکسی پَس",
            text: "Level 15",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 3000000,
            userLevel: 9,
          },
          {
            id: 56,
            date: "2023-01-17T20:58:10.284+00:00",
            startDate: "2023-01-17T20:57:00.000+00:00",
            expireDate: "2023-01-18T02:57:00.000+00:00",
            mode: "commission",
            label: "کمیسیون",
            text: "Commission",
            username: "coce",
            status: "Pending",
            received: false,
            amount: 3000000,
            userLevel: 9,
          },
        ],
        glevel: 4,
        glevelSecond: 12000,
      };
      localStorage.setItem("loginToken", JSON.stringify(d));
      prop.setRefresh(d);
    }
  };
  const handleConfirmTest = (bonus, loginToken) => {
    var bonus = loginToken.userGifts.filter((d) => d.id == bonus.id);
    bonus.status = "Done";
    bonus.received = true;

    loginToken.userGifts = _bonuses;

    localStorage.setItem("loginToken", JSON.stringify(loginToken));

    lastReward.push(bonus);
    lastReward.sort((a, b) => (a.id < b.id ? 1 : -1));
    prop.setRefresh(lastReward);
    localStorage.setItem("lastReward", JSON.stringify(lastReward));

    setTimeout(() => {
      prop.openPanelRight();
    }, 500);
    MyToast("انجام شد");
  };

  const handleConfirm = (bonus) => {
    var start = moment(bonus.date);
    var end = moment();
    var _br = "\n";

    if (bonus.status == "Pending") {
      if (!start.isBefore(end)) {
      } else {
        if (bonus.banaction) {
          var _msg = `در صورت دریافت بونوس برداشت و انتقال شما به مدت <span class="text-gold">${bonus.banaction} ساعت</span> بسته خواهد شد.`;
          if (bonus.balancereq > loginToken.balance || 1 == 1) {
            _msg = `برای دریافت این هدیه یا باید <span class="text-gold">لول شما  ${
              bonus.levelreq
            } یا بالاتر</span> باشد.<br/> یا موجودی اکانت شما بیش از <span class="text-gold">${doCurrency(
              bonus.balancereq
            )} تومان</span>  باشد. <br/><br/>${_msg}`;
          }

          if (parseInt(loginToken.balance) >= parseInt(bonus.balancereq)) {
            MyConfirm("تایید دریافت", _msg, getReward, bonus);
          } else {
            MyDeposit("تایید دریافت", _msg, openDeposit);
          }
        } else {
          getReward(bonus);
        }
      }
    }
  };
  var start = moment(prop.bonus.startDate);
  var expire = moment(prop.bonus.expireDate);
  var end = moment();
  try {
    var _lvl = prop.bonus.text
      .split(" ")[1]
      .replace("Bonus", "")
      .replace("Gift", "");
  } catch (error) {
    var _lvl = "1";
  }

  if (prop.bonus.mode == "bonus") {
    prop.bonus.banaction = 24;
  }
  if (
    prop.bonus.mode == "gpass" &&
    loginToken.level < levelDataInfo[0].minLevel
  ) {
    prop.bonus.banaction = levelDataInfo[0].banOutHours;
    prop.bonus.balancereq = levelDataInfo[0].minBalance;
    prop.bonus.levelreq = levelDataInfo[0].minLevel;
  }
  if (
    prop.bonus.mode == "vip" &&
    loginToken.level < levelDataInfo[1].minLevel
  ) {
    prop.bonus.banaction = levelDataInfo[1].banOutHours;
    prop.bonus.balancereq = levelDataInfo[1].minBalance;
    prop.bonus.levelreq = levelDataInfo[1].minLevel;
  }

  if (
    prop.bonus.mode == "league" &&
    loginToken.level < levelDataInfo[2].minLevel
  ) {
    prop.bonus.banaction = levelDataInfo[2].banOutHours;
    prop.bonus.balancereq = levelDataInfo[2].minBalance;
    prop.bonus.levelreq = levelDataInfo[2].minLevel;
  }

  var _status = prop.bonus.status;
  if (!end.isBefore(expire) && _status == "Pending") {
    _status = "Canceled";
  }
  if (_status == "Pending" && !start.isBefore(end)) {
    _status = "Clock";
  }
  var _mode = prop.bonus.mode;
  if (_mode == "gift") {
    if (prop.bonus.amount >= 500000) {
      _mode = "gift3";
    } else if (prop.bonus.amount >= 100000) {
      _mode = "gift2";
    } else {
      _mode = "gift1";
    }
  }
  return (
    <List.Item>
      <List.Content floated="right">
        <div className="farsi" style={{ height: 18 }}>
          <Status status={_status} circular icon size="mini" />{" "}
          {prop.bonus.label}
        </div>
        <small
          className="farsi"
          style={{
            padding: 10,
            display: "block",
            opacity: 0.5,
            paddingTop: 5,
          }}
        >
          {prop.bonus.status == "Done" && <>دریافت شده</>}
          {prop.bonus.status == "Pending" &&
            start.isBefore(end) &&
            end.isBefore(expire) && (
              <>
                <Moment
                  fromNow
                  onChange={(val) => {
                    prop.ChangeGift();
                  }}
                >
                  {prop.bonus.expireDate}
                </Moment>{" "}
                تا انقضا
              </>
            )}
          {prop.bonus.status == "Pending" &&
            start.isBefore(end) &&
            !end.isBefore(expire) && (
              <>
                انقضا در <Moment fromNow>{prop.bonus.expireDate}</Moment>
              </>
            )}
          {prop.bonus.status == "Pending" && !start.isBefore(end) && (
            <>
              <Moment
                fromNow
                onChange={(val) => {
                  prop.ChangeGift();
                }}
              >
                {prop.bonus.startDate}
              </Moment>{" "}
              تا فعالسازی
            </>
          )}
        </small>
        {prop.bonus.status == "Done" && (
          <>
            <Button
              animated="fade"
              size="mini"
              color="green"
              compact
              disabled
              style={{ opacity: 1, width: 140 }}
            >
              <Button.Content visible>
                <Icon name="check" /> {doCurrency(prop.bonus.amount)}
              </Button.Content>
              <Button.Content hidden className="farsi-inline">
                <Icon name="check" /> دریافت شده
              </Button.Content>
            </Button>
          </>
        )}
        {prop.bonus.status == "Pending" &&
          start.isBefore(end) &&
          end.isBefore(expire) && (
            <>
              <Button
                animated="fade"
                size="mini"
                color="green"
                compact
                loading={loading}
                disabled={loading}
                style={{ opacity: 1, width: 140 }}
                onClick={() => {
                  handleConfirm(prop.bonus, loginToken);
                  prop.ChangeGift();
                }}
              >
                <Button.Content visible>
                  {doCurrency(prop.bonus.amount)}
                </Button.Content>
                <Button.Content hidden className="farsi-inline">
                  <Icon name="download" /> دریافت
                </Button.Content>
              </Button>
            </>
          )}
        {prop.bonus.status == "Pending" &&
          start.isBefore(end) &&
          !end.isBefore(expire) && (
            <>
              <Button
                animated="fade"
                size="mini"
                color="red"
                compact
                disabled
                style={{ opacity: 1, width: 140 }}
              >
                <Button.Content visible>
                  <Icon name="times" /> {doCurrency(prop.bonus.amount)}
                </Button.Content>
                <Button.Content hidden className="farsi-inline">
                  <Icon name="times" /> منقضی شده
                </Button.Content>
              </Button>
            </>
          )}
        {prop.bonus.status == "Pending" && !start.isBefore(end) && (
          <>
            <Button
              animated="fade"
              size="mini"
              color="grey"
              compact
              style={{ opacity: 1, width: 140 }}
            >
              <Button.Content visible>
                <Icon name="clock" /> {doCurrency(prop.bonus.amount)}
              </Button.Content>
              <Button.Content hidden className="farsi-inline">
                <Moment fromNow>{prop.bonus.startDate}</Moment>
              </Button.Content>
            </Button>
          </>
        )}
      </List.Content>
      <div style={{ padding: 10 }}>
        <LevelIcon
          level={_lvl}
          mode={_mode}
          text={prop.bonus.text}
          onClick={() => {
            prop.openPanel("." + bonus.mode, "");
          }}
          classinside={levelClassInside(_lvl - 1)}
          number={_lvl}
          width="36px"
        />
      </div>
    </List.Item>
  );
};

export default BonusArea;
