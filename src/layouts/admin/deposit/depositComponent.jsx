import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";

const depositArea = (props) => {
  const [depMode, setDepMode] = useState(props.depMode);
  return (
    <span className="myaccount popupmenu">
      {depMode == "Bank Transfer" && <BankTransfer mode="Bank Transfer" />}
      {depMode == "Online Cart to Cart" && (
        <CartToCartOnline mode="Online Cart to Cart" />
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
