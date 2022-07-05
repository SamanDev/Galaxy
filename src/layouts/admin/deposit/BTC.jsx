import React from "react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
const BTC = (prop) => (
  <>
    <Amount dollar={true} />
    <DepositButton {...prop} />
  </>
);

export default BTC;
