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
import LevelIcon from "./RewardIcon";
import { doCurrency } from "../const";
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
        <Grid.Column width={6} className="myaccount">
          <div
            style={{
              width: 55,
              height: 55,
              background: "rgb(4,7,22)",
              background:
                "radial-gradient(circle, rgba(4,7,22,1) 0%, rgba(246,252,70,0) 50%)",
            }}
            onClick={(e) => {
              alert(prop.item.mode);
              localStorage.setItem("menucontent", prop.item.mode);
              $("#openmenucontent").trigger("click");
            }}
          >
            <div
              style={{
                margin: "auto",
                width: 40,
                fontSize: "200%",
                position: "relative",
                top: -7,
              }}
            >
              <LevelIcon level={_lvl} mode={prop.item.mode} text="" />
            </div>
          </div>

          <small
            className="text-gold fw-bold text-center"
            style={{
              display: "block",
              width: 55,
              position: "relative",
              top: -12,
            }}
          >
            {prop.item.username}
          </small>
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
