import React, { useState } from "react";
import {
  Icon,
  Item,
  Button,
  Header,
  Divider,
  Image,
  List,
} from "semantic-ui-react";
import LevelIcon from "../../../utils/GalaxyIcon";
import { doCurrency, levelDataInfo } from "../../../const";
import { Alert } from "../../../utils/alerts";
import { MyConfirm, MyToast, MyDeposit } from "../../../utils/myAlert";
import Status from "../../../utils/Status";
import Moment from "react-moment";
import Report from "../../../pages/dashboard/ReportPen";
import $ from "jquery";
const moment = require("moment");

var _bonuses = [
  {
    id: 4,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "commission",
    label: "کمیسیون",
    text: "Commission",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 6,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "gpass",
    label: "پاداش گلکسی پَس",
    text: "Level 4",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 5,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "rakeback",
    label: "ریک بک",
    text: "Rakeack",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 1,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "levels",
    label: "پاداش افزایش لٍوٍل",
    text: "Level 4",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 7,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "vip",
    label: "VIP Gift",
    text: "VIP Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 8,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "league",
    label: "لیگ روزانه",
    text: "Place 20",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift3",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 2,
    date: "2022-08-12T18:53:53.000+00:00",
    expireDate: "2022-08-12T23:54:03.000+00:00",
    mode: "bonus",
    label: "بوناس",
    text: "%5 Bonus",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
];

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};
const getReward = async (bonus, _bonuses, i, loginToken) => {
  try {
    const res = await deleteCategoryService(bonus.id);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
  handleConfirmTest(bonus, _bonuses, i, loginToken);
};
const handleConfirmTest = (bonus, _bonuses, i, loginToken) => {
  bonus.status = "Done";
  bonus.received = true;
  _bonuses[i] = bonus;
  loginToken.userGifts = _bonuses;
  localStorage.setItem("loginToken", JSON.stringify(loginToken));
  MyToast("انجام شد");
};
const handleConfirm = (bonus, _bonuses, i, loginToken) => {
  var start = moment(bonus.date);
  var end = moment();
  var _br = "\n";
  if (bonus.status == "Pending") {
    if (!start.isBefore(end)) {
    } else {
      if (bonus.banaction) {
        var _msg = `در صورت دریافت بونوس برداشت و انتقال شما به مدت <span class="text-gold">${bonus.banaction} ساعت</span> بسته خواهد شد.`;
        if (bonus.balancereq > loginToken.balance) {
          _msg = `برای دریافت این هدیه یا باید <span class="text-gold">لول شما  ${
            bonus.levelreq
          } یا بالاتر</span> باشد.<br/> یا موجودی اکانت شما بیش از <span class="text-gold">${doCurrency(
            bonus.balancereq
          )} تومان</span>  باشد. <br/><br/>${_msg}`;
        }

        if (parseInt(loginToken.balance) >= parseInt(bonus.balancereq)) {
          MyConfirm(
            "تایید دریافت",
            _msg,
            getReward,
            bonus,
            _bonuses,
            i,
            loginToken
          );
        } else {
          MyDeposit("تایید دریافت", _msg, openDeposit);
        }
      } else {
        handleConfirmTest(bonus, _bonuses, i, loginToken);
      }
    }
  }
};
const BonusArea = (prop) => {
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var _bonuses = loginToken.userGifts;
  _bonuses.sort((a, b) => (a.id < b.id ? 1 : -1));
  return (
    <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeout">
      {_bonuses.length > 0 && (
        <>
          <List divided inverted verticalAlign="middle">
            {_bonuses.map(function (bonus, i) {
              var start = moment(bonus.date);
              var expire = moment(bonus.expireDate);
              var end = moment();
              try {
                var _lvl = bonus.text
                  .split(" ")[1]
                  .replace("Bonus", "")
                  .replace("Gift", "");
              } catch (error) {
                var _lvl = "";
              }

              if (bonus.mode == "bonus") {
                bonus.banaction = 24;
              }
              if (
                bonus.mode == "gpass" &&
                loginToken.level < levelDataInfo[0].minLevel
              ) {
                bonus.banaction = levelDataInfo[0].banOutHours;
                bonus.balancereq = levelDataInfo[0].minBalance;
                bonus.levelreq = levelDataInfo[0].minLevel;
              }
              if (
                bonus.mode == "vip" &&
                loginToken.level < levelDataInfo[1].minLevel
              ) {
                bonus.banaction = levelDataInfo[1].banOutHours;
                bonus.balancereq = levelDataInfo[1].minBalance;
                bonus.levelreq = levelDataInfo[1].minLevel;
              }
              if (
                bonus.mode == "league" &&
                loginToken.level < levelDataInfo[2].minLevel
              ) {
                bonus.banaction = levelDataInfo[2].banOutHours;
                bonus.balancereq = levelDataInfo[2].minBalance;
                bonus.levelreq = levelDataInfo[2].minLevel;
              }

              var _status = bonus.status;
              if (!end.isBefore(expire) && _status == "Pending") {
                _status = "Canceled";
              }
              if (_status == "Pending" && !start.isBefore(end)) {
                _status = "Clock";
              }
              return (
                <List.Item key={i}>
                  <List.Content floated="right">
                    <div className="farsi" style={{ height: 18 }}>
                      <Status status={_status} circular icon size="mini" />{" "}
                      {bonus.label}
                    </div>
                    <small
                      className="farsi text-muted"
                      style={{ padding: 8, display: "block" }}
                    >
                      {bonus.status == "Done" && <>دریافت شده</>}
                      {bonus.status == "Pending" &&
                        start.isBefore(end) &&
                        end.isBefore(expire) && (
                          <>
                            <Moment
                              fromNow
                              onChange={(val) => {
                                prop.ChangeGift();
                              }}
                            >
                              {bonus.expireDate}
                            </Moment>{" "}
                            تا انقضا
                          </>
                        )}
                      {bonus.status == "Pending" &&
                        start.isBefore(end) &&
                        !end.isBefore(expire) && (
                          <>
                            انقضا در <Moment fromNow>{bonus.expireDate}</Moment>
                          </>
                        )}
                      {bonus.status == "Pending" && !start.isBefore(end) && (
                        <>
                          <Moment
                            fromNow
                            onChange={(val) => {
                              prop.ChangeGift();
                            }}
                          >
                            {bonus.date}
                          </Moment>{" "}
                          تا فعالسازی
                        </>
                      )}
                    </small>
                    {bonus.status == "Done" && (
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
                            <Icon name="check" /> {doCurrency(bonus.amount)}
                          </Button.Content>
                          <Button.Content hidden className="farsi-inline">
                            <Icon name="check" /> دریافت شده
                          </Button.Content>
                        </Button>
                      </>
                    )}
                    {bonus.status == "Pending" &&
                      start.isBefore(end) &&
                      end.isBefore(expire) && (
                        <>
                          <Button
                            animated="fade"
                            size="mini"
                            color="green"
                            compact
                            style={{ opacity: 1, width: 140 }}
                            onClick={() => {
                              handleConfirm(bonus, _bonuses, i, loginToken);
                              prop.ChangeGift();
                            }}
                          >
                            <Button.Content visible>
                              {doCurrency(bonus.amount)}
                            </Button.Content>
                            <Button.Content hidden className="farsi-inline">
                              <Icon name="download" /> دریافت
                            </Button.Content>
                          </Button>
                        </>
                      )}
                    {bonus.status == "Pending" &&
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
                              <Icon name="times" /> {doCurrency(bonus.amount)}
                            </Button.Content>
                            <Button.Content hidden className="farsi-inline">
                              <Icon name="times" /> منقضی شده
                            </Button.Content>
                          </Button>
                        </>
                      )}
                    {bonus.status == "Pending" && !start.isBefore(end) && (
                      <>
                        <Button
                          animated="fade"
                          size="mini"
                          color="grey"
                          compact
                          style={{ opacity: 1, width: 140 }}
                          onClick={() => {
                            handleConfirm(bonus);
                          }}
                        >
                          <Button.Content visible>
                            <Icon name="clock" /> {doCurrency(bonus.amount)}
                          </Button.Content>
                          <Button.Content hidden className="farsi-inline">
                            <Moment fromNow>{bonus.date}</Moment>
                          </Button.Content>
                        </Button>
                      </>
                    )}
                  </List.Content>
                  <div style={{ padding: 10 }}>
                    <LevelIcon
                      level={_lvl}
                      mode={bonus.mode}
                      text={bonus.text}
                      onClick={() => {
                        prop.openPanel("." + bonus.mode, "");
                      }}
                    />
                  </div>
                </List.Item>
              );
            })}
          </List>
          <Divider fitted />
        </>
      )}

      <Report mode="Pending" gateway="" count={3} {...prop} />
    </div>
  );
};

export default BonusArea;
