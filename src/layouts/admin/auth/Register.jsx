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
      <Segment inverted>
        <div style={{ margin: "5px 0" }}>
          <Header as="h4" inverted floated="right" className="farsi">
            ثبت نام در گلکسی
          </Header>
          <div
            className="farsi"
            style={{ cursor: "pointer", textAlign: "left", opacity: 0 }}
          >
            بازگشت <Icon name="arrow alternate circle left outline" />
          </div>
          <Divider />
          <Input
            size="mini"
            fluid
            label={
              <Label
                size="tiny"
                pointing="right"
                color="yellow"
                className="farsi"
              >
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
              <Label
                size="tiny"
                pointing="right"
                color="yellow"
                className="farsi"
              >
                ایمیل
              </Label>
            }
            labelPosition="left"
            defaultValue=""
          />
          <Input
            size="mini"
            fluid
            label={
              <Label
                size="tiny"
                pointing="right"
                color="yellow"
                className="farsi"
              >
                کلمه عبور
              </Label>
            }
            labelPosition="left"
            defaultValue=""
          />
          <Button
            content="ثبت نام"
            fluid
            style={{ margin: "10px 0" }}
            className="farsi"
            color="red"
          />
        </div>
      </Segment>
    </>
  );
};

export default depositArea;
