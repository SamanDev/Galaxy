import React from "react";
import { Label, Input } from "semantic-ui-react";
import Select from "../input/Select";
import Textarea from "../input/Textarea";
import Password from "../input/Password";
import CashoutButton from "../input/CashoutButton";
import Table from "../../../pages/dashboard/Table";
const countryOptions = [
  { key: "af", value: "af", text: "خرید چیپ" },
  { key: "ax", value: "ax", text: "برداشت" },
  { key: "al", value: "al", text: "پشتیبانی فنی" },
];
const USDT = (prop) => (
  <>
    {!prop.departman && (
      <Input size="mini" fluid labelPosition="left">
        <Label size="tiny" pointing="right" color="yellow" className="farsi">
          انتخاب دپارتمان
        </Label>
        <Select
          name="departman"
          className="farsi"
          fluid
          options={countryOptions}
          defaultValue={countryOptions[0].value}
        />
      </Input>
    )}

    <Textarea />
    <CashoutButton val="ارسال" />
  </>
);

export default USDT;
