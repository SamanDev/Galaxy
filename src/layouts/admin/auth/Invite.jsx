import React, { useState } from "react";
import {
  Label,
  Input,
  Header,
  Divider,
  Icon,
  Button,
  Segment,
} from "semantic-ui-react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  return (
    <>
      <Input
        size="mini"
        fluid
        label={
          <Label size="tiny" pointing="right" color="yellow" className="farsi">
            نام گاربری
          </Label>
        }
        labelPosition="left"
        defaultValue=""
      />
      <Input
        size="mini"
        fluid
        label={
          <Label size="tiny" pointing="right" color="yellow" className="farsi">
            ایمیل
          </Label>
        }
        labelPosition="left"
        defaultValue=""
      />

      <Button
        content="ساخت اکانت"
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="orange"
      />
    </>
  );
};

export default depositArea;
