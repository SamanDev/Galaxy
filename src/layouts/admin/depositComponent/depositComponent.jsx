import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";
import Cashout from "../cashout/cashoutComponent";

import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(prop.depMode);

  return (
    <span className="myaccount popupmenu">
      {prop.title && (
        <>
          <Header as="h4" inverted className="farsi" style={{ marginTop: 10 }}>
            {prop.title}
          </Header>

          <Divider inverted section />
        </>
      )}
      {prop.compmode == "deposit" ? (
        <>
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
          {depMode == "BTC" && (
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
        </>
      ) : (
        <>
          <Cashout
            mode={depMode}
            cashMode={depMode}
            size="mini"
            labelcolor="orange"
            list={true}
          />
        </>
      )}
    </span>
  );
};

export default depositArea;
