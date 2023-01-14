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

import Moment from "react-moment";
import Report from "../../../pages/dashboard/ReportPen";
import $ from "jquery";
const moment = require("moment");

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};

const BonusArea = (prop) => {
  const handleConfirmTest = (bonus, _bonuses, i, loginToken) => {
    var lastReward = [];
    try {
      lastReward = JSON.parse(localStorage.getItem("lastReward"));
    } catch (error) {}
    if (lastReward == null) {
      lastReward = [];
    }
    bonus.status = "Done";
    bonus.received = true;
    bonus.id = lastReward.length + 1;
    _bonuses[i] = bonus;
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

  const handleConfirm = (bonus, _bonuses, i, loginToken) => {
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
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var _bonuses = loginToken.userGifts;
  _bonuses.sort((a, b) => (a.id < b.id ? 1 : -1));
  return (
    <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeoutend">
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
                var _lvl = "1";
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
              var _mode = bonus.mode;
              if (_mode == "gift") {
                if (bonus.amount >= 500000) {
                  _mode = "gift3";
                } else if (bonus.amount >= 100000) {
                  _mode = "gift2";
                } else {
                  _mode = "gift1";
                }
              }
              return (
                <List.Item key={i}>
                  <List.Content floated="right">
                    <div className="farsi" style={{ height: 18 }}>
                      <Status status={_status} circular icon size="mini" />{" "}
                      {bonus.label}
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
                      mode={_mode}
                      text={bonus.text}
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
