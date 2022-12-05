import React, { useState } from "react";
import { Button, Message, Icon } from "semantic-ui-react";
import $ from "jquery";
const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      <Message color="red" compact className="mymessage" size="mini" icon>
        <Icon
          circular
          inverted
          color="black"
          name="mail outline"
          style={{ fontSize: 20 }}
        />

        <Message.Content className="farsi">
          برای استفاده از این سرویس ابتدا باید ایمیل خود را تایید نمایید.
        </Message.Content>
      </Message>
      <Button
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="red"
        onClick={() => $("#openaddcart").trigger("click")}
      >
        ارسال لینک تایید
      </Button>
    </>
  );
};

export default depositArea;
