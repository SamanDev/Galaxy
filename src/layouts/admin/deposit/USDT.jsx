import React from "react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
const USDT = (prop) => (
  <>
    <Amount dollar={true} />
    <DepositButton {...prop} />
  </>
);

export default USDT;
