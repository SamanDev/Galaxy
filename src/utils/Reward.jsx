import React from "react";
import { Grid, Modal, Button, Icon } from "semantic-ui-react";
import LevelIcon from "./svg";
import { doCurrency, levelClassInside, levelDataInfo } from "../const";
import { convertDateToJalali } from "./convertDate";
const Reward = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var _mode = prop.item.mode;
  if (_mode == "gift") {
    if (prop.item.amount >= levelDataInfo[4].minAmount) {
      _mode = "gift3";
    } else if (prop.item.amount >= levelDataInfo[5].minAmount) {
      _mode = "gift2";
    } else {
      _mode = "gift1";
    }
  }
  var _defUser = "";
  if (loginToken) {
    _defUser = loginToken.username;
  }
  var _txt = prop.item.label;
  try {
    var _lvl = prop.item.text
      .split(" ")[1]
      .replace("Bonus", "")
      .replace("Gift", "");
  } catch (error) {
    var _lvl = "";
  }
  if (prop.item.mode == "gpass") {
    _txt = "پاداش لول " + _lvl + " گلکسی پَس";
  }
  if (prop.item.mode == "league") {
    _txt = "رتبه " + _lvl + " " + _txt;
  }
  if (prop.item.mode == "tournament" && _lvl != "") {
    _txt = "رتبه " + _lvl + " " + _txt;
  }
  if (prop.item.mode == "tournament" && _lvl == "") {
    _txt = "معرفی نفر پایانی تورنومنت ";
  }
  if (prop.item.mode == "vip") {
    _txt = "پاداش میز VIP";
  }
  if (_mode == "gift3") {
    _txt = "هدیه طلایی";
  }
  if (_mode == "gift2") {
    _txt = "هدیه بنفش";
  }
  if (_mode == "gift1") {
    _txt = "هدیه قرمز";
  }

  return (
    <Grid
      verticalAlign="middle"
      divided="vertically"
      inverted
      padded="vertically"
    >
      <Grid.Row
        className={
          _defUser == prop.item.username && !prop.color ? "rewardred" : ""
        }
      >
        <Grid.Column width={6}>
          <div style={{ marginLeft: 10 }}>
            <LevelIcon
              level={_lvl}
              number={_lvl}
              mode={_mode.toLowerCase()}
              text={prop.item.username}
              classinside={levelClassInside(_lvl - 1)}
              width="36px"
            />
          </div>
        </Grid.Column>
        <Grid.Column width={10} textAlign="right">
          <div className="farsi">
            <span className="text-gold">{doCurrency(prop.item.amount)}</span>{" "}
            تومان
          </div>
          <small className="farsi rewardtext">{_txt}</small>
          {convertDateToJalali(prop.item.date)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Reward;
