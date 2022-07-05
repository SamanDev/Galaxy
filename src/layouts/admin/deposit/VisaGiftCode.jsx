import React from "react";
import { Label, Input } from "semantic-ui-react";
import DepositButton from "../input/DepositButton";

const VisaGiftCode = (prop) => (
  <>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="yellow" pointing="right">
          Visa Gift Code
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <DepositButton {...prop} />
  </>
);

export default VisaGiftCode;
