import React from "react";
import Amount from "../input/Amount";
import CashoutButton from "../input/CashoutButton";
import { Divider } from "semantic-ui-react";

const USDT = (prop) => (
  <>
    <Amount def={100000} />
    <CashoutButton {...prop} />
  </>
);

export default USDT;
