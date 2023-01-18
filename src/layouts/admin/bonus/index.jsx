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
import Bonus from "./bonus";
import $ from "jquery";
const moment = require("moment");

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};

const BonusArea = (prop) => {
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var _bonuses = loginToken.userGifts;
  _bonuses.sort((a, b) => (a.id < b.id ? 1 : -1));
  return (
    <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeoutend">
      {_bonuses.length > 0 && (
        <>
          <List divided inverted verticalAlign="middle">
            {_bonuses.map(function (bonus, i) {
              return <Bonus key={i} bonus={bonus} {...prop} />;
            })}
          </List>
          <Divider fitted />
        </>
      )}
    </div>
  );
};

export default BonusArea;
