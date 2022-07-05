import React from "react";

import Amount from "../input/Amount";
import Password from "../input/Password";
import CashoutButton from "../input/CashoutButton";
import List from "../../../pages/dashboard/List";
import { Label, Input, Message, Icon, Divider } from "semantic-ui-react";
import Select from "../input/Select";
const SelectB = "بانک ملّی ایران,بانک اقتصاد نوین,بانک قرض‌الحسنه مهر ایران,بانک سپه,بانک پارسیان,بانک قرض‌الحسنه رسالت,بانک صنعت و معدن,بانک کارآفرین,بانک کشاورزی,بانک سامان,بانک مسکن,بانک سینا,بانک توسعه صادرات ایران,بانک خاور میانه,بانک توسعه تعاون,بانک شهر,پست بانک ایران,بانک دی,بانک صادرات,بانک ملت,بانک تجارت,بانک رفاه,بانک حکمت ایرانیان,بانک گردشگری,بانک ایران زمین,بانک قوامین,بانک انصار,بانک سرمایه,بانک پاسارگاد,بانک مشترک ایران-ونزوئلا".split(
  ","
);
const bankOptions = [];
SelectB.map(function(bank, i) {
  bankOptions.push({ key: i, value: bank, text: bank });
});
const USDT = (prop) => (
  <>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="red" pointing="right" className="farsi">
          نام و نام خانوادگی
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />

    <Input size="mini" fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="black" className="farsi">
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
    <Divider inverted />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="yellow" pointing="right" className="farsi">
          شماره شبا
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="yellow" pointing="right" className="farsi">
          شماره حساب
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Divider inverted />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="orange" pointing="right" className="farsi">
          شماره کارت
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="orange" pointing="right" className="farsi">
          cvv2 کارت
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />

    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="orange" pointing="right" className="farsi">
          ماه انقضا کارت
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="orange" pointing="right" className="farsi">
          سال انقضا کارت
        </Label>
      }
      labelPosition="left"
      defaultValue=""
    />
    <CashoutButton val="ثبت" color="olive" />
    <Divider inverted fitted />
    <List />
  </>
);

export default USDT;
