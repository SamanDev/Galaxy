import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";

import AddCartMsg from "./addCartMsg";

const depositArea = (prop) => {
  console.log(prop);
  const [depMode, setDepMode] = useState(prop.gateway);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      {depMode == "Bank Transfer" && (
        <>
          {loginToken?.bankInfos.length > 0 ? (
            <>
              <BankTransfer {...prop} />
            </>
          ) : (
            <>
              <AddCartMsg {...prop} />
            </>
          )}
        </>
      )}
      {depMode == "Online Cart to Cart" && (
        <>
          {loginToken?.bankInfos.length > 0 ? (
            <>
              <CartToCartOnline {...prop} />
            </>
          ) : (
            <>
              <AddCartMsg {...prop} />
            </>
          )}
        </>
      )}
      {depMode == "Cart to Cart" && (
        <>
          {loginToken?.bankInfos.length > 0 ? (
            <>
              <CartToCart {...prop} />
            </>
          ) : (
            <>
              <AddCartMsg {...prop} />
            </>
          )}
        </>
      )}

      {depMode == "USDT" && <USDT {...prop} />}
      {depMode == "BTC" && <BTC {...prop} />}
      {depMode == "VisaGiftCode" && <VisaGiftCode {...prop} />}
      {depMode == "PerfectMoney" && <PerfectMoney {...prop} />}
    </>
  );
};

export default depositArea;
