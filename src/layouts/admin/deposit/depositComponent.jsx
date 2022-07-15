import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";

import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (props) => {
  const [depMode, setDepMode] = useState(props.depMode);

  return (
    <span className="myaccount popupmenu">
      {props.title && (
        <>
          <Header as="h4" inverted className="farsi" style={{ marginTop: 10 }}>
            {props.title}
          </Header>

          <Divider inverted section />
        </>
      )}
      {depMode == "Bank Transfer" && <BankTransfer mode="Bank Transfer" />}
      {depMode == "Online Cart to Cart" && (
        <CartToCartOnline mode="Online Cart to Cart" size="mini" />
      )}
      {depMode == "Cart to Cart" && <CartToCart mode="Cart to Cart" />}
      {depMode == "USDT" && <USDT mode="USDT" />}
      {depMode == "Bitcoin" && <BTC mode="BTC" />}
      {depMode == "VisaGiftCode" && <VisaGiftCode mode="VisaGiftCode" />}
      {depMode == "PerfectMoney" && <PerfectMoney mode="PerfectMoney" />}
    </span>
  );
};

export default depositArea;
