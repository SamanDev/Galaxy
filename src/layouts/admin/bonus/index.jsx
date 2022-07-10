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
import { doCurrency } from "../../../const";
import { Alert, Confirm } from "../../../utils/alerts";
import Status from "../../../utils/Status";
import Moment from "react-moment";
const moment = require("moment");

var _bonuses = [];

_bonuses.push({
  label: "VIP 25/50K",
  level: "",
  text: "VIP Gift",
  amount: "1000000",
  mode: "vip",
  status: "Pending",
  banaction: 24 * 2,
  balancereq: 10000000,
  levelreq: 25,
  date: "2022-07-07T22:00:00",
});
_bonuses.push({
  label: "بوناس",
  level: "",
  text: "%5 Bonus",
  amount: "25000",
  mode: "bonus",
  status: "Pending",
  banaction: 24,
  date: "2022-07-07T22:00:00",
});
_bonuses.push({
  label: "هدیه",
  level: "",
  text: "Free Gift",
  amount: "100000",
  mode: "gift1",
  status: "Pending",

  date: "2022-07-08T22:00:00",
});
_bonuses.push({
  label: "هدیه",
  level: "",
  text: "Free Gift",
  amount: "500000",
  mode: "gift2",
  status: "Pending",
  date: "2022-07-08T22:00:00",
});
_bonuses.push({
  label: "هدیه",
  level: "",
  text: "Free Gift",
  amount: "2000000",
  mode: "gift3",
  status: "Pending",
  date: "2022-07-08T22:00:00",
});
_bonuses.push({
  label: "افزایش لٍوٍل",
  level: 60,
  text: "Level ",
  amount: "70000000",
  mode: "levels",
  status: "Pending",
  date: "2022-07-08T07:00:00",
});
_bonuses.push({
  label: "گلکسی پَس",
  level: 2,
  text: "Level ",
  amount: "1000000",
  mode: "gpass",
  status: "Pending",
  date: "2022-07-08T01:59:00",
});
_bonuses.push({
  label: "لیگ روزانه",
  level: 5,
  text: "Place ",
  amount: "100000",
  mode: "league",
  status: "Done",
  date: "2022-04-19T12:59-0500",
});
const handleConfirm = async (rowData) => {
  var start = moment(rowData.date);
  var end = moment();
  var _br = "\n";
  if (rowData.status == "Pending") {
    if (!start.isBefore(end)) {
    } else {
      if (rowData.banaction) {
        var _msg = `در صورت دریافت بونوس برداشت و انتقال شما به مدت ${rowData.banaction} ساعت بسته خواهد شد.`;
        if (rowData.balancereq) {
          _msg = `برای دریافت این هدیه یا باید لول شما  ${
            rowData.levelreq
          } یا بالاتر باشد.${_br} یا موجودی اکانت شما بیش از ${doCurrency(
            rowData.balancereq
          )}  باشد. ${_br}${_br}${_msg}`;
        }
        if (await Confirm("تایید دریافت", _msg)) {
          try {
            const res = await deleteCategoryService(rowData.id);
            if (res.status === 200) {
              setData(data.filter((d) => d.id != rowData.id));
              Alert("انجام شد", res.data.message, "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Alert("انجام شد", "", "success");
      }
    }
  }
};
const BonusArea = (prop) => {
  return (
    <div style={{ margin: "5px 0 5px 0" }}>
      <List
        divided
        inverted
        verticalAlign="middle"
        className="bonuslist fadeout2"
      >
        {_bonuses.map(function (bonus, i) {
          var start = moment(bonus.date);
          var end = moment();

          return (
            <List.Item key={i}>
              <List.Content floated="right">
                <div className="farsi" style={{ height: 18 }}>
                  <Status status={bonus.status} circular icon size="mini" />{" "}
                  {bonus.label}
                </div>

                {bonus.status == "Done" && (
                  <Button
                    animated="fade"
                    size="mini"
                    color="blue"
                    compact
                    readOnly
                    style={{ opacity: 1, marginTop: 5, width: 140 }}
                  >
                    <Button.Content visible>
                      <Icon name="check" /> {doCurrency(bonus.amount)}
                    </Button.Content>
                    <Button.Content hidden className="farsi-inline">
                      <Icon name="check" /> دریافت شده
                    </Button.Content>
                  </Button>
                )}
                {bonus.status == "Pending" && start.isBefore(end) && (
                  <Button
                    animated="fade"
                    size="mini"
                    color="green"
                    compact
                    style={{ opacity: 1, marginTop: 5, width: 140 }}
                    onClick={() => {
                      handleConfirm(bonus);
                    }}
                  >
                    <Button.Content visible>
                      {doCurrency(bonus.amount)}
                    </Button.Content>
                    <Button.Content hidden className="farsi-inline">
                      <Icon name="download" /> دریافت
                    </Button.Content>
                  </Button>
                )}
                {bonus.status == "Pending" && !start.isBefore(end) && (
                  <Button
                    animated="fade"
                    size="mini"
                    color="red"
                    compact
                    style={{ opacity: 1, marginTop: 5, width: 140 }}
                    onClick={() => {
                      handleConfirm(bonus);
                    }}
                  >
                    <Button.Content visible>
                      <Icon name="clock" /> {doCurrency(bonus.amount)}
                    </Button.Content>
                    <Button.Content hidden className="farsi-inline">
                      <Moment
                        fromNow
                        onChange={(val) => {
                          console.log(val);
                        }}
                      >
                        {bonus.date}
                      </Moment>
                    </Button.Content>
                  </Button>
                )}
              </List.Content>
              <LevelIcon
                level={bonus.level}
                mode={bonus.mode}
                text={bonus.text + bonus.level}
                onClick={() => {
                  prop.openPanel("." + bonus.mode, "#lvl" + bonus.level);
                }}
              />
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default BonusArea;
