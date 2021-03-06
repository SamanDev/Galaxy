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
      {depMode == "Bank Transfer" && (
        <BankTransfer
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
        />
      )}
      {depMode == "Online Cart to Cart" && (
        <CartToCartOnline
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
        />
      )}
      {depMode == "Cart to Cart" && (
        <CartToCart
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
        />
      )}
      {depMode == "USDT" && (
        <USDT mode={depMode} size="mini" labelcolor="orange" list={true} />
      )}
      {depMode == "Bitcoin" && (
        <BTC mode={depMode} size="mini" labelcolor="orange" list={true} />
      )}
      {depMode == "VisaGiftCode" && (
        <VisaGiftCode
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
        />
      )}
      {depMode == "PerfectMoney" && (
        <PerfectMoney
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
        />
      )}
    </span>
  );
};

export default depositArea;
