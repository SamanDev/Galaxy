import React from "react";
import { Label, Input } from "semantic-ui-react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
const PerfectMoney = (prop) => (
  <>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" pointing="right" color="yellow">
          eVoucher Number
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" pointing="right" color="yellow">
          Activition Code
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Amount rate={true} />
    <DepositButton {...prop} />
  </>
);

export default PerfectMoney;
