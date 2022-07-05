import React from "react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import { Label, Input, Message, Icon, Divider } from "semantic-ui-react";
import Select from "../input/Select";
const countryOptions = [
  { key: "1", value: "5 تا 10 میلیون", text: "5 تا 10 میلیون" },
  { key: "2", value: "11 تا 20 میلیون", text: "11 تا 20 میلیون" },
  { key: "3", value: "21 تا 50 میلیون", text: "21 تا 50 میلیون" },
];
const bankOptions = [{ key: "af", value: "ملی", text: "ملی" }];
const USDT = (prop) => (
  <>
    <Message color="red" compact className="mymessage" size="mini" icon>
      <Icon circular inverted color="black" style={{ fontSize: 20 }}>
        <span>1</span>
      </Icon>
      <Message.Content className="farsi">
        ابتدا مبلغ مورد نظر و نام بانک خود انتخاب کنید و همراه با شماره واتس اپ
        خود ارسال نمایید.
      </Message.Content>
    </Message>

    <Input size="mini" fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="yellow" className="farsi">
        مبلغ به تومان
      </Label>
      <Select
        name="amount"
        className="farsi"
        fluid
        options={countryOptions}
        defaultValue={countryOptions[0].value}
      />
    </Input>
    <Input size="mini" fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="yellow" className="farsi">
        نام بانک
      </Label>
      <Select
        name="bank"
        className="farsi"
        fluid
        options={bankOptions}
        defaultValue={bankOptions[0].value}
      />
    </Input>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="teal" pointing="right" className="farsi">
          شماره واتس اپ
        </Label>
      }
      labelPosition="left"
      defaultValue="+98912"
    />
    <Divider inverted />
    <Message color="yellow" compact className="mymessage" size="mini" icon>
      <Icon circular inverted color="black" style={{ fontSize: 20 }}>
        <span>2</span>
      </Icon>
      <Message.Content className="farsi">
        دقایقی پس از ارسال، برای هماهنگی و ارسال شماره حساب با شما تماس خواهیم
        گرفت.
      </Message.Content>
    </Message>

    <DepositButton {...prop} val="ارسال" />
  </>
);

export default USDT;
