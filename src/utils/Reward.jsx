import React from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
  Grid,
} from "semantic-ui-react";
import LevelIcon from "./svg";
import { doCurrency, levelClassInside } from "../const";
import { convertDateToJalali } from "./convertDate";
import $ from "jquery";
const Reward = (prop) => {
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
  }
  if (prop.item.mode == "league") {
    _txt = "رتبه " + _lvl + " " + _txt;
  }
  if (prop.item.mode == "vip") {
    _txt = "پاداش میز VIP";
  }
  return (
    <Grid
      verticalAlign="middle"
      divided="vertically"
      inverted
      padded="vertically"
    >
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column width={6}>
          <div style={{ marginLeft: 10 }}>
            <LevelIcon
              level={_lvl}
              number={_lvl}
              mode={prop.item.mode}
              text={prop.item.username}
              classinside={levelClassInside(_lvl - 1)}
              width="32px"
            />
          </div>
        </Grid.Column>
        <Grid.Column width={10} textAlign="right">
          <div className="farsi">
            <span className="text-gold">{doCurrency(prop.item.amount)}</span>{" "}
            تومان
          </div>
          <small className="farsi" style={{ height: 28, display: "block" }}>
            {_txt}
          </small>
          {convertDateToJalali(prop.item.createDate)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Reward;