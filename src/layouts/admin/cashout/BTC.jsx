import React from "react";
import { Label, Input, Divider } from "semantic-ui-react";
import Amount from "../input/Amount";
import Password from "../input/Password";
import CashoutButton from "../input/CashoutButton";
import List from "../../../pages/dashboard/ListCashier";
const BTC = (prop) => (
  <>
    <Amount dollar={true} />

    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="red" pointing="right">
          BTC Wallet
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Password />
    <CashoutButton {...prop} />
  </>
);

export default BTC;
