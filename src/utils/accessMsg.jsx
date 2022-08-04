import React, { useState } from "react";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";
import VisaGiftCode from "../layouts/admin/depositComponent/VisaGiftCode";
import PerfectMoney from "../layouts/admin/depositComponent/PerfectMoney";
import BankTransfer from "../layouts/admin/depositComponent/BankTransfer";
import CartToCart from "../layouts/admin/depositComponent/CartToCart";
import CartToCartOnline from "../layouts/admin/depositComponent/CartToCartOnline";
import USDT from "../layouts/admin/depositComponent/USDT";
import BTC from "../layouts/admin/depositComponent/BTC";
import { depositData } from "../const";
import CashoutArea from "../layouts/admin/cashout/index";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      <span className="myaccount popupmenu">
        {prop.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        <div className="farsi text-center mymessage ui small">
          <Icon color="red" name="ban" size="huge" inverted />
          <br />
          <br />
          برای دسترسی به این قسمت باید وارد سیستم شوید.
          <br />
          <br />
          <Button
            color="orange"
            size="mini"
            className="farsi"
            onClick={() => $("#openLogin").trigger("click")}
          >
            ورود
          </Button>{" "}
          <Button
            color="yellow"
            size="mini"
            className="farsi"
            onClick={() => $("#openRegister").trigger("click")}
          >
            ثبت نام
          </Button>
        </div>
      </span>
    </>
  );
};

export default depositArea;
