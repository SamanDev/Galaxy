import React from "react";
import Amount from "../input/Amount";
import CashoutButton from "../input/CashoutButton";
const PerfectMoney = (prop) => (
  <>
    <Amount dollar={true} />
    <CashoutButton {...prop} />
  </>
);

export default PerfectMoney;
