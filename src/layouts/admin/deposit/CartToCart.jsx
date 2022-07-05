import React from "react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import { Label, Input, Message, Icon, Divider } from "semantic-ui-react";
import Select from "../input/Select";
const countryOptions = [
  { key: "af", value: "5022502250225050", text: "5022502250225050" },
];
const USDT = (prop) => (
  <>
    <Message color="red" compact className="mymessage" size="mini" icon>
      <Icon circular inverted color="black" style={{ fontSize: 20 }}>
        <span>1</span>
      </Icon>
      <Message.Content className="farsi">
        ابتدا مبلغ مورد نظر (یک تا سه میلیون) را به کارت زیر انتقال دهید.
      </Message.Content>
    </Message>
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="red" pointing="right" className="farsi">
          واریز به
        </Label>
      }
      labelPosition="left"
      defaultValue={countryOptions[0].value}
    />
    <Input
      size="mini"
      fluid
      label={
        <Label size="tiny" color="red" pointing="right" className="farsi">
          به نام
        </Label>
      }
      labelPosition="left"
      defaultValue="Ali (Melli)"
    />
    <Divider inverted />
    <Message color="yellow" compact className="mymessage" size="mini" icon>
      <Icon circular inverted color="black" style={{ fontSize: 20 }}>
        <span>2</span>
      </Icon>
      <Message.Content className="farsi">
        سپس اطلاعات زیر را وارد نمایید و منتظر تائید باشید.
      </Message.Content>
    </Message>

    <Input size="mini" fluid labelPosition="left">
      <Label size="tiny" pointing="right" color="yellow" className="farsi">
        واریز از
      </Label>
      <Select
        name="departman"
        className="farsi"
        fluid
        options={countryOptions}
        defaultValue={countryOptions[0].value}
      />
    </Input>
    <Amount def="1000000" />

    <DepositButton {...prop} />
  </>
);

export default USDT;
