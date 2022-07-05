import React from "react";
import { Label, Input, Divider } from "semantic-ui-react";
import Amount from "../input/Amount";
import Password from "../input/Password";
import CashoutButton from "../input/CashoutButton";
import List from "../../../pages/dashboard/List";
const USDT = () => (
  <>
    <Amount />

    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="black" pointing="right" className="farsi">
          انتقال به کاربر
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Password />
    <CashoutButton val="انتقال" mode="Transfer" />
  </>
);

export default USDT;
