import React from "react";
import { Label, Input } from "semantic-ui-react";
import Amount from "../input/Amount";
import Password from "../input/Password";
import CashoutButton from "../input/CashoutButton";
const USDT = (prop) => (
  <>
    <Amount dollar={true} />

    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="red" pointing="right">
          Trc20 Wallet
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Password />
    <CashoutButton {...prop} />
  </>
);

export default USDT;
