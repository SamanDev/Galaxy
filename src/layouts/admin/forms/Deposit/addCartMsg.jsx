import React, { useState } from "react";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";
import VisaGiftCode from "./VisaGiftCode";
import PerfectMoney from "./PerfectMoney";
import BankTransfer from "./BankTransfer";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import USDT from "./USDT";
import BTC from "./BTC";
import { depositData } from "../../../../const";
import CashoutArea from "../../cashout/index";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      <Button
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="teal"
        onClick={() => {
          prop.openPanel(".addcart");
        }}
      >
        ثبت کارت بانکی
      </Button>
    </>
  );
};

export default depositArea;
