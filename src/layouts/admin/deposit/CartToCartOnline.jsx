import React from "react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import {
  Label,
  Input,
  Message,
  Icon,
  Divider,
  Button,
} from "semantic-ui-react";
import $ from "jquery";
import Select from "../input/Select";
const cartOptions = [
  {
    key: "1",
    value: "6104337830282164",
    text: "6104337830282164",
    date: "2022-04-19T04:48:34.122+00:00",
    cardnumber: "6104337830282164",
    holdername: "محمد عباسی",
    cvv: "237",
    expiration: "0302",
    mobile: "09122266208",
    gateway: "IranShetab",
    gatewayname: "Hamrahcart",
    active: true,
  },
];

const loginToken = JSON.parse(localStorage.getItem("loginToken"));

var countryOptions = [];
if (loginToken) {
  loginToken?.cashierGateways.map((item, i) => {
    if (item.mode == "IranShetab" && item.active) {
      countryOptions.push({
        key: i.toString(),
        value: item.name,
        text: item.name,
      });
    }
  });
}

const USDT = (prop) => (
  <>
    <Input size={prop.size} fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="yellow" className="farsi">
        واریز از
      </Label>
      <Select
        name="departman"
        className="farsi"
        fluid
        options={cartOptions}
        defaultValue={cartOptions[0].value}
      />
    </Input>
    <Amount def="100000" size={prop.size} />
    <Input size={prop.size} fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="yellow" className="farsi">
        توسط
      </Label>
      <Select
        name="departman"
        className="farsi"
        fluid
        options={countryOptions}
        defaultValue={countryOptions[0].value ? countryOptions[0].value : null}
      />
    </Input>
    <Input
      size={prop.size}
      fluid
      label={
        <Label size="tiny" color="red" pointing="right" className="farsi">
          شماره همراه
        </Label>
      }
      labelPosition="left"
      defaultValue="+98912"
    />
    <Button.Group fluid size="mini" widths="2" style={{ marginTop: "10px" }}>
      <Button
        className="farsi"
        color="blue"
        onClick={() => {
          $(".onarea").hide();
          $(".online1").show();
        }}
      >
        ارسال کد فعالسازی
      </Button>
      <Button.Or text="یا" className="farsi" />
      <Button
        color="green"
        className="farsi"
        onClick={() => {
          $(".onarea").hide();
          $(".online2").show();
        }}
      >
        ارسال رمز پویا
      </Button>
    </Button.Group>
    <div className="onarea online1" style={{ display: "none" }}>
      <Divider inverted />

      <Input
        size={prop.size}
        fluid
        label={
          <Label size="tiny" color="blue" pointing="right" className="farsi">
            کد فعالسازی
          </Label>
        }
        labelPosition="left"
        defaultValue=""
      />
      <Button
        content={"تایید"}
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="blue"
        size="mini"
      />
    </div>
    <div className="onarea online2" style={{ display: "none" }}>
      <Divider inverted />
      <Input
        size={prop.size}
        fluid
        label={
          <Label size="tiny" color="green" pointing="right" className="farsi">
            رمز پویا
          </Label>
        }
        labelPosition="left"
        defaultValue=""
      />

      <DepositButton {...prop} />
    </div>
  </>
);

export default USDT;
